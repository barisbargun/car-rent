import { Link } from 'react-router'

type Props = {
  data: FooterFull
}

export const FooterTitle = ({ data }: Props) => {
  return (
    <div>
      <h4 className="max-sm:mb-2 max-sm:text-lg">{data.title}</h4>
      <ul>
        {[...data.footerLinks]
          .sort((a, b) => a.index - b.index)
          .map((v) => (
            <li
              key={v.id}
              className="mb-1 text-sm opacity-60 hover:opacity-90 max-sm:mb-3 max-sm:text-base"
            >
              <Link
                to={v.link || ''}
                target={v.link && v.link?.length > 1 ? '_blank' : '_self'}
              >
                {v.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
