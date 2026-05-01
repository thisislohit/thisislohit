const footerColumns = [
  { title: "Product", links: ["Features", "Roadmap", "Changelog", "Integrations"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Contact"] },
  { title: "Resources", links: ["Documentation", "API", "Guides", "Status"] },
];

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white px-6 py-20">
    <div className="mx-auto max-w-[1200px]">
      <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
        <div>
          <p className="text-2xl font-bold tracking-tight text-slate-900">Loomify</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">The all-in-one customer meeting and workflow platform for modern product teams.</p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-semibold text-slate-900">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="text-sm text-slate-600 hover:text-slate-900">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 border-t border-slate-200 pt-8 text-sm text-slate-500">© 2026 Loomify Inc. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer;
