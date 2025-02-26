import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

export default function KampanyaOnizlemePage({ params }: { params: { kampanyaId: string } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kampanya Önizleme</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Kampanya ID: {params.kampanyaId}</p>
        {/* Add campaign preview content here */}
      </CardContent>
    </Card>
  )
}

