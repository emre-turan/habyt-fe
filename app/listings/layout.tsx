import { Container } from "@/components/ui/container"

interface ListingsLayoutProps {
  children: React.ReactNode
}

export default function ListingsLayout({ children }: ListingsLayoutProps) {
  return <Container className="py-8">{children}</Container>
}
