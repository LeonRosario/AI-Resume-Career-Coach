import { Home, FileText, CreditCard, Info } from "lucide-react"
import { AnimeNavBar } from "./anime-navbar"

const items = [
  { name: "Home", url: "#", icon: Home },
  { name: "Convert", url: "#", icon: FileText },
  { name: "Pricing", url: "#", icon: CreditCard },
  { name: "About", url: "#", icon: Info },
]

export function AnimeNavBarDemo() {
  return <AnimeNavBar items={items} defaultActive="Home" />
}
