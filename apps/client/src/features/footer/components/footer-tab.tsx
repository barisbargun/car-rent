import { FooterFull } from "@repo/typescript-config/types/api"
import { Link } from "react-router"

type Props = {
  data: FooterFull
}

export const FooterTitle = ({ data }: Props) => {
  return (
    data &&
    <div>
      <h4 className="max-sm:text-lg max-sm:mb-2">{data.title}</h4>
      <ul>
        {[...data.footerLinks].sort((a, b) => a.index - b.index).map(v => (
          <li key={v.id} className="text-sm opacity-60 hover:opacity-90 mb-1 max-sm:text-base max-sm:mb-3">
            <Link to={v.link || ""} target={v.link && v.link?.length > 1 ? "_blank" : "_self"}>{v.title}</Link>
          </li>
        ))}
      </ul>
    </div>

  )
}
