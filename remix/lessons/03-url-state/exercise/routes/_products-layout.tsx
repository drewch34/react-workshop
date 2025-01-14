import { useId } from 'react'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation, useSearchParams } from '@remix-run/react'
import { Heading } from '~/components/Heading'
import { getBrands, getProducts } from '~/utils/db.server'
import type { LoaderArgs } from '@remix-run/node'
import { UnpackLoader, sortLabel } from '~/utils/helpers'
import { Icon } from '~/components/Icon'

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams
  const [products, brands] = await Promise.all([getProducts(searchParams), getBrands()])

  return json({
    products,
    brands: brands.sort(sortLabel),
  })
}

export type LoaderData = UnpackLoader<typeof loader>

export default function () {
  const { brands } = useLoaderData() as LoaderData

  return (
    <div className="flex gap-6">
      <aside className="w-72 p-6 rounded-lg bg-white shadow-sm space-y-6">
        <section className="space-y-1">
          <Heading as="h2" size={4}>
            Filter By Brand
          </Heading>
          {brands.map((brand) => {
            return (
              <FilterLink key={brand.id} value={brand.handle}>
                {brand.label}
              </FilterLink>
            )
          })}
        </section>
      </aside>
      <main className="flex-1 space-y-3">
        <Outlet />
      </main>
    </div>
  )
}

function FilterLink({ children, value }: { children: React.ReactNode; value: string }) {
  const id = useId()
  const url = useLocation().pathname

  // Current URL
  const [search] = useSearchParams()
  const brand = search.get('brand')
  const on = brand === value

  // Next URL
  const nextSearch = new URLSearchParams(search.toString())
  if (on) {
    nextSearch.delete('brand')
  } else {
    nextSearch.set('brand', value)
  }

  const to = `${url}?${nextSearch.toString()}`

  return (
    <Link to={to} className="block">
      <input id={id} type="checkbox" className="hidden" />
      <span className="text-brandColor mr-2">
        {on ? <Icon name="checkboxOn" /> : <Icon name="checkboxOff" />}
      </span>
      <label htmlFor={id} className="cursor-pointer">
        {children}
      </label>
    </Link>
  )
}
