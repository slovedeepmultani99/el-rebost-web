import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get("file") as File
  const bucket = (formData.get("bucket") as string) || "galeria"

  if (!file) return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 })

  const ext = file.name.split(".").pop()
  const filename = `${bucket}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await supabaseAdmin.storage
    .from("restaurante")
    .upload(filename, buffer, { contentType: file.type, upsert: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data } = supabaseAdmin.storage.from("restaurante").getPublicUrl(filename)
  return NextResponse.json({ url: data.publicUrl }, { status: 201 })
}
