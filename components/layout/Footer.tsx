export default function Footer() {
  return (
    <footer className="bg-surface-warm border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl text-text-primary mb-4">Jashni</h3>
            <p className="text-text-secondary text-sm">
              Handcrafted crochet pieces made with love in India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/shop" className="text-text-secondary hover:text-primary text-sm">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="text-text-secondary hover:text-primary text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-text-secondary hover:text-primary text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-display text-lg text-text-primary mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li>
                <a href="/shipping" className="text-text-secondary hover:text-primary text-sm">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="text-text-secondary hover:text-primary text-sm">
                  Returns
                </a>
              </li>
              <li>
                <a href="/faq" className="text-text-secondary hover:text-primary text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg text-text-primary mb-4">Stay Updated</h4>
            <p className="text-text-secondary text-sm mb-4">
              Subscribe for updates on new collections.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 border border-border rounded bg-surface text-text-primary text-sm"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center text-text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} Jashni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}