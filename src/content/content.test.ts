import { describe, it, expect } from "vitest";
import { content, portfolio } from "./content";

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
});

describe("portfolio page integrity", () => {
  const nonEmpty = (s: string) => expect(s.trim().length).toBeGreaterThan(0);

  it("has unique anchor keys (they are URL fragments)", () => {
    const keys = [...portfolio.projects.map((p) => p.key), portfolio.talk.key, "philosophy"];
    expect(new Set(keys).size).toBe(keys.length);
    for (const k of keys) expect(k).toMatch(/^[a-z0-9-]+$/);
  });

  it("answers the application's questions for every project, plus the bet", () => {
    expect(portfolio.projects.length).toBeGreaterThanOrEqual(3);
    for (const p of portfolio.projects) {
      [p.name, p.kicker, p.role, p.when, p.status, p.summary, p.hard, p.learned, p.result, p.visualCaption].forEach(nonEmpty);
      expect(p.built.length).toBeGreaterThan(0);
      p.built.forEach(nonEmpty);
      nonEmpty(p.bet.downside);
      nonEmpty(p.bet.upside);
      expect(p.stats.length).toBe(3);
    }
  });

  it("every project and channel link is an absolute http(s) URL", () => {
    for (const p of portfolio.projects) for (const l of p.links) expect(l.href).toMatch(/^https?:\/\/.+/);
  });

  it("the pull line is always attributed, and flagged as a paraphrase or a quotation", () => {
    const { quote, quoteIsParaphrase, source } = portfolio.philosophy;
    if (quote) {
      nonEmpty(source.author);
      nonEmpty(source.title);
      expect(typeof quoteIsParaphrase).toBe("boolean");
    }
    portfolio.philosophy.body.forEach(nonEmpty);
  });

  it("the talk photo folder lives under public/portfolio/ and has alt text", () => {
    expect(portfolio.talk.image.dir).toMatch(/^portfolio\/[\w-]+$/);
    nonEmpty(portfolio.talk.image.alt);
  });
});
