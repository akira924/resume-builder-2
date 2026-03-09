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

const PAGE_W = 215.9;
const PAGE_H = 279.4;
const MARGIN_X = 15.24;
const MARGIN_TOP = 15.24;
const MARGIN_BOTTOM = 15.24;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const LINE_HEIGHT = 4.6;

export function generateResumePdf(data: CompletedResume): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'letter' });
  let y = MARGIN_TOP + 20 * 0.35;

  function ensureSpace(needed: number) {
    if (y + needed > PAGE_H - MARGIN_BOTTOM) {
      doc.addPage();
      y = MARGIN_TOP + 11 * 0.35;
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
    y += 5.5;
  }

  // --- Header: Name ---
  const p = data.personal ?? {};
  if (p.fullName) {
    drawCenteredText(p.fullName, 22, 'bold', [20, 20, 20]);
    y += 0.5;
  }

  // --- Role ---
  if (data.role) {
    drawCenteredText(data.role, 14, 'bold', [50, 50, 50]);
  }

  // --- Contact row ---
  type ContactSegment = { text: string; url?: string };
  const contactSegments: ContactSegment[] = [];
  if (p.email) contactSegments.push({ text: p.email });
  if (p.phone) contactSegments.push({ text: p.phone });
  if (p.location) contactSegments.push({ text: p.location });
  if (p.linkedin) contactSegments.push({ text: 'LinkedIn', url: p.linkedin });
  if (p.github) contactSegments.push({ text: 'GitHub', url: p.github });
  if (p.website) contactSegments.push({ text: 'Website', url: p.website });

  if (contactSegments.length) {
    const fontSize = 11;
    const separator = '  |  ';
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);

    const sepW = doc.getTextWidth(separator);
    const segmentWidths = contactSegments.map((s) => doc.getTextWidth(s.text));
    const totalW =
      segmentWidths.reduce((a, b) => a + b, 0) + sepW * (contactSegments.length - 1);
    let cx = (PAGE_W - totalW) / 2;

    ensureSpace(fontSize * 0.42);
    for (let i = 0; i < contactSegments.length; i++) {
      const seg = contactSegments[i];
      if (seg.url) {
        doc.setTextColor(37, 99, 235);
        doc.textWithLink(seg.text, cx, y, { url: seg.url });
      } else {
        doc.setTextColor(90, 90, 90);
        doc.text(seg.text, cx, y);
      }
      cx += segmentWidths[i];
      if (i < contactSegments.length - 1) {
        doc.setTextColor(90, 90, 90);
        doc.text(separator, cx, y);
        cx += sepW;
      }
    }
    y += fontSize * 0.42;
    y += 0.5;
  }

  y += 2;

  // --- Summary ---
  if (data.summary) {
    sectionHeading('Summary');
    drawText(data.summary, MARGIN_X, CONTENT_W, 11, 'normal', [55, 55, 55]);
    y += 1;
  }

  // --- Skills ---
  if (data.skills?.length) {
    sectionHeading('Skills');
    for (const group of data.skills) {
      for (const [category, skills] of Object.entries(group)) {
        ensureSpace(LINE_HEIGHT * 2);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(40, 40, 40);
        const label = category + ': ';
        doc.text(label, MARGIN_X, y);
        const labelW = doc.getTextWidth(label);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(70, 70, 70);
        const skillsText = skills.join(', ');
        const firstLineParts = doc.splitTextToSize(skillsText, CONTENT_W - labelW) as string[];
        doc.text(firstLineParts[0], MARGIN_X + labelW, y);
        y += LINE_HEIGHT;
        if (firstLineParts.length > 1) {
          const remaining = firstLineParts.slice(1).join(' ');
          const wrapLines = doc.splitTextToSize(remaining, CONTENT_W) as string[];
          for (const line of wrapLines) {
            ensureSpace(LINE_HEIGHT);
            doc.text(line, MARGIN_X, y);
            y += LINE_HEIGHT;
          }
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

      // Row 1: Job title (left), Period (right)
      if (exp.title) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(30, 30, 30);
        doc.text(exp.title, MARGIN_X, y);
      }
      if (exp.period) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        const rw = doc.getTextWidth(exp.period);
        doc.text(exp.period, PAGE_W - MARGIN_X - rw, y);
      }
      y += LINE_HEIGHT;

      // Row 2: Company name (left), Location (right, italic)
      if (exp.company) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        doc.text(exp.company, MARGIN_X, y);
      }
      if (exp.location) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        const rw = doc.getTextWidth(exp.location);
        doc.text(exp.location, PAGE_W - MARGIN_X - rw, y);
      }
      y += LINE_HEIGHT + 0.5;

      for (const sentence of exp.sentences) {
        ensureSpace(LINE_HEIGHT * 2);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
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
    for (let i = 0; i < data.education.length; i++) {
      const edu = data.education[i];
      ensureSpace(12);

      // Row 1: Degree/major (left), Period (right)
      if (edu.degree) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(30, 30, 30);
        doc.text(edu.degree, MARGIN_X, y);
      }
      if (edu.period) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        const rw = doc.getTextWidth(edu.period);
        doc.text(edu.period, PAGE_W - MARGIN_X - rw, y);
      }
      y += LINE_HEIGHT;

      // Row 2: Institution (left), Location (right, italic)
      if (edu.institution) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        doc.text(edu.institution, MARGIN_X, y);
      }
      if (edu.location) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        const rw = doc.getTextWidth(edu.location);
        doc.text(edu.location, PAGE_W - MARGIN_X - rw, y);
      }
      y += LINE_HEIGHT;

      if (i < data.education.length - 1) y += 2;
    }
    y += 1;
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
      doc.setFontSize(11);
      doc.setTextColor(30, 30, 30);
      doc.text(leftText, MARGIN_X, y);

      if (cert.period) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        const rw = doc.getTextWidth(cert.period);
        doc.text(cert.period, PAGE_W - MARGIN_X - rw, y);
      }
      y += LINE_HEIGHT + 1;
    }
  }

  return doc;
}
