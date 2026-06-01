import { expect, test, type Page } from "@playwright/test";

async function scrollSection(page: Page, selector: string) {
  const section = page.locator(selector);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  return section;
}

async function dismissBoot(page: Page) {
  const overlay = page.locator("[data-testid='boot-overlay']");
  const isVisible = await overlay.isVisible().catch(() => false);
  if (isVisible) {
    await overlay.click();
    await page.waitForTimeout(600);
  }
}

test("homepage renders the core portfolio story", async ({ page }) => {
  await page.goto("/");
  await dismissBoot(page);

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Dharsan Guruparan"
  );
  await expect(page.getByText("SDET + Backend Engineer")).toBeVisible();
  await expect(page.getByText("OPEN TO WORK")).toBeVisible();
  await expect(page.getByRole("link", { name: "$ inspect builds" })).toBeVisible();
  await expect(page.getByRole("link", { name: "$ open resume" })).toBeVisible();
  await expect(page.getByRole("link", { name: "$ ping dharsan" })).toBeVisible();
});

test("boot screen is shown and dismissible", async ({ page }) => {
  await page.goto("/");

  const overlay = page.locator("[data-testid='boot-overlay']");
  await expect(overlay).toBeVisible();

  await overlay.click();
  await page.waitForTimeout(600);
  await expect(overlay).not.toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Dharsan Guruparan"
  );
});

test("all terminal sections are present and readable after hydration", async ({
  page,
}) => {
  await page.goto("/");
  await dismissBoot(page);

  await expect(page.locator("[data-terminal-section]")).toHaveCount(6);

  await expect(
    (await scrollSection(page, "#about")).getByText("# Operating Model")
  ).toBeVisible();

  await expect(
    (await scrollSection(page, "#skills")).getByText(/languages\//i)
  ).toBeVisible();

  await expect(
    (await scrollSection(page, "#projects")).getByText(/total 6/)
  ).toBeVisible();

  await expect(
    (await scrollSection(page, "#experience")).getByText(/commit/)
  ).toBeVisible();

  await expect(
    (await scrollSection(page, "#contact")).getByText(
      "PING dharsan@guruparan.dev"
    )
  ).toBeVisible();
});

test("reduced-motion users see content immediately without boot", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expect(
    page.locator("[data-testid='boot-overlay']")
  ).not.toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Dharsan Guruparan"
  );
  await expect(page.locator("#projects")).toBeVisible();

  const firstLine = page.locator("[data-terminal-line]").first();
  const style = await firstLine.getAttribute("style");
  expect(style ?? "").not.toContain("opacity");
  expect(style ?? "").not.toContain("visibility");
});

test("project rows exist, show 6 featured projects, and navigate to detail", async ({
  page,
}) => {
  await page.goto("/");
  await dismissBoot(page);
  await scrollSection(page, "#projects");

  const rows = page.locator("[data-testid='project-row']");
  await expect(rows).toHaveCount(6);

  await rows.first().click();
  await expect(page).toHaveURL(/\/projects\//);
  await expect(page.getByText("← cd ..")).toBeVisible();
});

test("skills section shows all skill groups including Quality Gate Engineering", async ({
  page,
}) => {
  await page.goto("/");
  await dismissBoot(page);
  const skills = await scrollSection(page, "#skills");

  await expect(
    skills.getByRole("heading", { name: "Quality Gate Engineering" })
  ).toBeVisible();
  await expect(skills.getByText("Quality gates")).toBeVisible();
  await expect(skills.getByText("Shift-left testing strategy")).toBeVisible();
});

test("navbar exposes scroll targets and mobile menu", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await dismissBoot(page);
  const header = page.locator("header");

  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(
      header.getByRole("link", { name: "~/projects/" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Close navigation menu" }).click();
  } else {
    for (const name of [
      "~/about.md",
      "~/skills",
      "~/projects/",
      "~/git log",
      "~/ping",
    ]) {
      await expect(
        header.getByRole("link", { name, exact: true })
      ).toBeVisible();
    }
  }
});

test("contact section has working direct links", async ({ page }) => {
  await page.goto("/");
  await dismissBoot(page);
  const contact = await scrollSection(page, "#contact");

  await expect(
    contact.getByRole("link", { name: "→ email" })
  ).toHaveAttribute("href", /^mailto:/);
  await expect(
    contact.getByRole("link", { name: "→ github" })
  ).toHaveAttribute("href", /github\.com/);
  await expect(
    contact.getByRole("link", { name: "→ linkedin" })
  ).toHaveAttribute("href", /linkedin\.com/);
});
