import { Column } from "@atom/column";
import { Label } from "@atom/label";

export default function Header() {
  return (
    <Column as="header" role="banner" className="text-[2rem] h-[70px] justify-center">
        <Label className="text-[#000000]">MUSINSA</Label>
    </Column>
  )
}
