# -*- coding: utf-8 -*-
"""Tests complets -- Generation du Lien"""
import sys, json
sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright

RESULTS = []

def log(test, status, detail=""):
    icon = "[OK]" if status == "PASS" else "[KO]"
    RESULTS.append({"test": test, "status": status, "detail": detail})
    print(f"  {icon} {test}: {detail}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()

    print("\n===========================================")
    print("  AGENT TESTS -- Generation du Lien")
    print("===========================================\n")

    # 1. Backend Health
    print("[1] Backend Health")
    try:
        resp = page.request.get("http://localhost:3001/health")
        body = resp.json()
        if resp.status == 200 and body.get("status") == "ok":
            log("Health endpoint", "PASS", f"status=ok, ts={body.get('timestamp')}")
        else:
            log("Health endpoint", "FAIL", f"status={resp.status}")
    except Exception as e:
        log("Health endpoint", "FAIL", str(e))

    # 2. Page d'accueil
    print("\n[2] Page d'accueil")
    page.goto("http://localhost:5173", wait_until="networkidle")
    page.screenshot(path="test_homepage.png")
    title = page.title()
    log("Titre page", "PASS" if title else "FAIL", title or "vide")
    h1 = page.locator("h1").first
    if h1.count():
        log("H1 present", "PASS", h1.inner_text()[:60])
    else:
        log("H1 present", "FAIL", "aucun h1")
    nav_links = page.locator("nav a, header a").all()
    log("Liens navigation", "PASS" if len(nav_links) > 0 else "FAIL", f"{len(nav_links)} lien(s)")

    # 3. Page d'inscription
    print("\n[3] Page d'inscription (/auth/register)")
    page.goto("http://localhost:5173/auth/register", wait_until="networkidle")
    page.screenshot(path="test_register.png")

    for label, sel in [
        ("Prenom",    'input[name="firstName"]'),
        ("Nom",       'input[name="lastName"]'),
        ("Email",     'input[type="email"]'),
        ("Password",  'input[type="password"]'),
    ]:
        found = page.locator(sel).count() > 0
        log(f"Champ {label}", "PASS" if found else "FAIL")

    hcap = page.locator("iframe[src*='hcaptcha']")
    log("Widget hCaptcha", "PASS" if hcap.count() > 0 else "FAIL",
        f"{hcap.count()} iframe hcaptcha")

    btn = page.locator("button[type='submit']")
    log("Bouton submit", "PASS" if btn.count() > 0 else "FAIL",
        btn.inner_text() if btn.count() else "absent")

    # 4. Validation formulaire vide
    print("\n[4] Validation formulaire (soumission vide)")
    btn.click()
    page.wait_for_timeout(600)
    errors = page.locator("[class*='error'], .text-red-600").all()
    log("Erreurs de validation", "PASS" if len(errors) > 0 else "FAIL",
        f"{len(errors)} message(s)")
    page.screenshot(path="test_register_errors.png")

    # 5. Page de connexion
    print("\n[5] Page de connexion (/auth/login)")
    page.goto("http://localhost:5173/auth/login", wait_until="networkidle")
    page.screenshot(path="test_login.png")
    email_f = page.locator('input[type="email"]')
    pwd_f   = page.locator('input[type="password"]')
    sub_btn = page.locator("button[type='submit']")
    log("Champ email",    "PASS" if email_f.count() > 0 else "FAIL")
    log("Champ password", "PASS" if pwd_f.count() > 0 else "FAIL")
    log("Bouton login",   "PASS" if sub_btn.count() > 0 else "FAIL",
        sub_btn.inner_text() if sub_btn.count() else "absent")

    # Login avec mauvais credentials
    email_f.fill("inexistant@example.com")
    pwd_f.fill("WrongPass1!")
    sub_btn.click()
    page.wait_for_timeout(1800)
    page.screenshot(path="test_login_fail.png")
    err_el = page.locator("[class*='error'], .bg-error-50").first
    log("Erreur login invalide", "PASS" if err_el.count() > 0 else "FAIL",
        err_el.inner_text()[:60] if err_el.count() else "pas d'erreur affichee")

    # 6. API comportements metier
    print("\n[6] API -- Comportements metier")

    # Email en double
    resp = page.request.post("http://localhost:3001/api/auth/register",
        data=json.dumps({"email":"demo@example.com","password":"Demo1234!@",
                         "firstName":"Jean","lastName":"Dupont","captchaToken":"x"}),
        headers={"Content-Type":"application/json"})
    log("Email doublon -> 409", "PASS" if resp.status == 409 else "FAIL",
        f"status={resp.status}")

    # Captcha absent -> 422
    resp = page.request.post("http://localhost:3001/api/auth/register",
        data=json.dumps({"email":"new@example.com","password":"Pass1234!",
                         "firstName":"X","lastName":"Y"}),
        headers={"Content-Type":"application/json"})
    log("Captcha absent -> 422", "PASS" if resp.status == 422 else "FAIL",
        f"status={resp.status}")

    # Login user inexistant -> 401
    resp = page.request.post("http://localhost:3001/api/auth/login",
        data=json.dumps({"email":"nobody@example.com","password":"anything"}),
        headers={"Content-Type":"application/json"})
    log("Login inexistant -> 401", "PASS" if resp.status in (401, 404) else "FAIL",
        f"status={resp.status}")

    # 7. API Topics
    print("\n[7] API Topics")
    resp = page.request.get("http://localhost:3001/api/topics")
    body = resp.json()
    topics = body.get("data", [])
    log("GET /api/topics", "PASS" if resp.status == 200 else "FAIL",
        f"status={resp.status}, {len(topics)} topic(s)")

    # 8. Route inconnue -> 404
    print("\n[8] Route inconnue")
    resp = page.request.get("http://localhost:3001/api/does-not-exist")
    log("Route 404", "PASS" if resp.status == 404 else "FAIL", f"status={resp.status}")

    browser.close()

    # Resume
    passed = sum(1 for r in RESULTS if r["status"] == "PASS")
    failed = sum(1 for r in RESULTS if r["status"] == "FAIL")
    total  = len(RESULTS)

    print(f"\n{'='*43}")
    print(f"  Resultat : {passed}/{total} tests passes")
    if failed:
        print(f"  Echecs   : {failed}")
        for r in RESULTS:
            if r["status"] == "FAIL":
                print(f"    [KO] {r['test']}: {r['detail']}")
    print(f"{'='*43}\n")
