import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "proposals.json");

async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (e) {
    console.error("Error creating proposals directory/file", e);
  }
}

export async function GET(request: Request) {
  try {
    await ensureFile();
    const content = await fs.readFile(DATA_FILE, "utf-8");
    const proposals = JSON.parse(content || "[]");
    return NextResponse.json({ success: true, proposals });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureFile();
    const newProposal = await request.json();
    const content = await fs.readFile(DATA_FILE, "utf-8");
    const proposals = JSON.parse(content || "[]");

    const index = proposals.findIndex(
      (p: any) => (newProposal.id && p.id === newProposal.id) || (newProposal.proposalRef && p.proposalRef === newProposal.proposalRef)
    );

    if (index >= 0) {
      proposals[index] = { ...proposals[index], ...newProposal, updatedAt: new Date().toISOString() };
    } else {
      proposals.unshift({
        ...newProposal,
        createdAt: newProposal.createdAt || new Date().toISOString(),
      });
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(proposals, null, 2), "utf-8");
    return NextResponse.json({ success: true, proposal: newProposal });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    await ensureFile();
    const content = await fs.readFile(DATA_FILE, "utf-8");
    let proposals = JSON.parse(content || "[]");
    proposals = proposals.filter((p: any) => p.id !== id && p.proposalRef !== id);
    await fs.writeFile(DATA_FILE, JSON.stringify(proposals, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
