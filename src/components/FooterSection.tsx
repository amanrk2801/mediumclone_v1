export default function FooterSection({ title, children }:any) {
    return (
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <ul className="space-y-2">{children}</ul>
      </div>
    )
  }
  