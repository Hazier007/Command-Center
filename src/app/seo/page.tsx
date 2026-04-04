import { redirect } from "next/navigation"

// SEO tasks are now filtered on the Tasks page with category='seo'
export default function SeoPage() {
  redirect("/tasks?category=seo")
}
