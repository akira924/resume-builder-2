import jsPDF from 'jspdf';

interface CompletedResume {
  personal?: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  role?: string;
  summary?: string;
  skills?: Record<string, string[]>[];
  experience?: {
    company?: string;
    period?: string;
    location?: string;
    title: string;
    sentences: string[];
  }[];
  education?: {
    institution?: string;
    degree: string;
    period?: string;
    location?: string;
  }[];
  certifications?: {
    institution?: string;
    certification?: string;
    period?: string;
  }[];
}

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN_X = 16;
const MARGIN_TOP = 18;
const MARGIN_BOTTOM = 16;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const LINE_HEIGHT = 4.6;

export function generateResumePdf(data: CompletedResume): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = MARGIN_TOP;

  function ensureSpace(needed: number) {
    if (y + needed > PAGE_H - MARGIN_BOTTOM) {
      doc.addPage();
      y = MARGIN_TOP;
    }
  }

  function drawText(
    text: string,
    x: number,
    maxW: number,
    fontSize: number,
    style: 'normal' | 'bold' | 'italic' = 'normal',
    color: [number, number, number] = [40, 40, 40],
  ): number {
    doc.setFont('helvetica', style);
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, maxW) as string[];
    const lh = fontSize * 0.42;
    for (const line of lines) {
      ensureSpace(lh);
      doc.text(line, x, y);
      y += lh;
    }
    return lines.length;
  }

  function drawCenteredText(
    text: string,
    fontSize: number,
    style: 'normal' | 'bold' = 'normal',
    color: [number, number, number] = [40, 40, 40],
  ) {
    doc.setFont('helvetica', style);
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const tw = doc.getTextWidth(text);
    const cx = (PAGE_W - tw) / 2;
    ensureSpace(fontSize * 0.42);
    doc.text(text, cx, y);
    y += fontSize * 0.42;
  }

  function sectionHeading(title: string) {
    ensureSpace(10);
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    doc.text(title.toUpperCase(), MARGIN_X, y);
    y += 1.2;
    doc.setDrawColor(60, 60, 60);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_X, y, PAGE_W - MARGIN_X, y);
    y += 3.5;
  }

  // --- Header: Name ---
  const p = data.personal ?? {};
  if (p.fullName) {
    drawCenteredText(p.fullName, 20, 'bold', [20, 20, 20]);
    y += 0.5;
  }

  // --- Contact row ---
  const contactParts: string[] = [];
  if (p.email) contactParts.push(p.email);
  if (p.phone) contactParts.push(p.phone);
  if (p.location) contactParts.push(p.location);
  if (p.linkedin) contactParts.push(p.linkedin);
  if (p.github) contactParts.push(p.github);
  if (p.website) contactParts.push(p.website);

  if (contactParts.length) {
    const contactStr = contactParts.join('  |  ');
    drawCenteredText(contactStr, 8.5, 'normal', [90, 90, 90]);
    y += 0.5;
  }

  // --- Role ---
  if (data.role) {
    drawCenteredText(data.role, 11, 'bold', [50, 50, 50]);
  }

  y += 2;

  // --- Summary ---
  if (data.summary) {
    sectionHeading('Summary');
    drawText(data.summary, MARGIN_X, CONTENT_W, 9.5, 'normal', [55, 55, 55]);
    y += 1;
  }

  // --- Skills ---
  if (data.skills?.length) {
    sectionHeading('Skills');
    for (const group of data.skills) {
      for (const [category, skills] of Object.entries(group)) {
        ensureSpace(LINE_HEIGHT * 2);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(40, 40, 40);
        const label = category + ': ';
        doc.text(label, MARGIN_X, y);
        const labelW = doc.getTextWidth(label);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(70, 70, 70);
        const skillLines = doc.splitTextToSize(skills.join(', '), CONTENT_W - labelW) as string[];
        doc.text(skillLines[0], MARGIN_X + labelW, y);
        y += LINE_HEIGHT;
        for (let i = 1; i < skillLines.length; i++) {
          ensureSpace(LINE_HEIGHT);
          doc.text(skillLines[i], MARGIN_X + labelW, y);
          y += LINE_HEIGHT;
        }
      }
    }
    y += 1;
  }

  // --- Experience ---
  if (data.experience?.length) {
    sectionHeading('Experience');
    for (let i = 0; i < data.experience.length; i++) {
      const exp = data.experience[i];
      ensureSpace(12);

      const leftParts: string[] = [];
      if (exp.title) leftParts.push(exp.title);
      if (exp.company) leftParts.push(exp.company);
      const leftText = leftParts.join('  —  ');

      const rightParts: string[] = [];
      if (exp.location) rightParts.push(exp.location);
      if (exp.period) rightParts.push(exp.period);
      const rightText = rightParts.join('  |  ');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      doc.text(leftText, MARGIN_X, y);

      if (rightText) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        const rw = doc.getTextWidth(rightText);
        doc.text(rightText, PAGE_W - MARGIN_X - rw, y);
      }
      y += LINE_HEIGHT + 0.5;

      for (const sentence of exp.sentences) {
        ensureSpace(LINE_HEIGHT * 2);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(55, 55, 55);
        doc.text('•', MARGIN_X + 2, y);
        const bulletLines = doc.splitTextToSize(sentence, CONTENT_W - 8) as string[];
        for (let j = 0; j < bulletLines.length; j++) {
          ensureSpace(LINE_HEIGHT);
          doc.text(bulletLines[j], MARGIN_X + 6, y);
          y += LINE_HEIGHT;
        }
      }
      if (i < data.experience.length - 1) y += 2;
    }
    y += 1;
  }

  // --- Education ---
  if (data.education?.length) {
    sectionHeading('Education');
    for (const edu of data.education) {
      ensureSpace(8);

      const leftParts: string[] = [];
      if (edu.degree) leftParts.push(edu.degree);
      if (edu.institution) leftParts.push(edu.institution);
      const leftText = leftParts.join('  —  ');

      const rightParts: string[] = [];
      if (edu.location) rightParts.push(edu.location);
      if (edu.period) rightParts.push(edu.period);
      const rightText = rightParts.join('  |  ');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      const eduLines = doc.splitTextToSize(leftText, CONTENT_W - (rightText ? 50 : 0)) as string[];
      doc.text(eduLines[0], MARGIN_X, y);

      if (rightText) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        const rw = doc.getTextWidth(rightText);
        doc.text(rightText, PAGE_W - MARGIN_X - rw, y);
      }
      y += LINE_HEIGHT;
      for (let i = 1; i < eduLines.length; i++) {
        doc.text(eduLines[i], MARGIN_X, y);
        y += LINE_HEIGHT;
      }
      y += 1;
    }
  }

  // --- Certifications ---
  if (data.certifications?.length) {
    sectionHeading('Certifications');
    for (const cert of data.certifications) {
      ensureSpace(8);

      const leftParts: string[] = [];
      if (cert.certification) leftParts.push(cert.certification);
      if (cert.institution) leftParts.push(cert.institution);
      const leftText = leftParts.join('  —  ');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      doc.text(leftText, MARGIN_X, y);

      if (cert.period) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        const rw = doc.getTextWidth(cert.period);
        doc.text(cert.period, PAGE_W - MARGIN_X - rw, y);
      }
      y += LINE_HEIGHT + 1;
    }
  }

  return doc;
}
