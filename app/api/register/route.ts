import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      role,
      department,
      poste,
    } = await req.json();

    if (!fullName || !email || !phone || !password || !role || !department || !poste) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        password: hashedPassword,
        role,
        department,
        poste,
      },
    });

    return NextResponse.json({ message: "Compte créé avec succès" });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}