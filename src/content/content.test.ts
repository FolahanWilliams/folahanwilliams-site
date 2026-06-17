import { describe, it, expect } from "vitest";
import { content } from "./content";

describe("content integrity", () => {
  it("has a name and a hero line", () => {
    expect(content.name.trim().length).toBeGreaterThan(0);
    expect(content.heroLine.trim().length).toBeGreaterThan(0);
  });

  it("has at least the core work items, each with title + body + kindLabel", () => {
    expect(content.work.length).toBeGreaterThanOrEqual(4);
    for (const w of content.work) {
      expect(w.title.trim().length).toBeGreaterThan(0);
      expect(w.body.trim().length).toBeGreaterThan(0);
      expect(w.kindLabel.trim().length).toBeGreaterThan(0);
      // detail is optional, but if present it must be non-empty (it drives the hover-expand)
      if (w.detail !== undefined) expect(w.detail.trim().length).toBeGreaterThan(0);
    }
  });

  it("has a work-section heading and subhead", () => {
    expect(content.workIntro.heading.trim().length).toBeGreaterThan(0);
    expect(content.workIntro.subhead.trim().length).toBeGreaterThan(0);
  });

  it("has How-I-think paragraphs and a pull-quote", () => {
    expect(content.howIThink.paragraphs.length).toBeGreaterThan(0);
    expect(content.howIThink.pullQuote.trim().length).toBeGreaterThan(0);
  });

  it("every link is an absolute http(s) URL", () => {
    for (const l of content.links) {
      expect(l.href).toMatch(/^https?:\/\/.+/);
      expect(l.label.trim().length).toBeGreaterThan(0);
    }
  });

  it("contact email is a mailto-able address", () => {
    expect(content.contactEmail).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  it("never names the advisor (confidentiality §7)", () => {
    expect(content.proof.advisor.toLowerCase()).not.toContain("reiner");
    expect(content.proof.advisor).toMatch(/\$32B|Wiz/);
  });
});
