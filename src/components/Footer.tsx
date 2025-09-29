import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-surface-foreground mb-4">
              Nadun Liyanage
            </h3>
            <p className="text-muted mb-4">
              Full-stack developer passionate about creating amazing digital experiences.
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com/nadunsliyanage" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Github className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="https://github.com/tonadun" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Github className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/nadunliyanage" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="mailto:hello@nadunliyanage.com">
                <Button variant="ghost" size="icon">
                  <Mail className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-surface-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-muted hover:text-surface-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-muted hover:text-surface-foreground transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted hover:text-surface-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted hover:text-surface-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-surface-foreground mb-4">
              Get In Touch
            </h4>
            <p className="text-muted mb-2">hello@nadunliyanage.com</p>
            <p className="text-muted mb-4">Manchester (UK)</p>
            <Button>
              <Mail className="w-4 h-4 mr-2" />
              Say Hello
            </Button>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted flex items-center justify-center gap-1">
            © 2024 Nadun Liyanage. Made with{" "}
            <Heart className="w-4 h-4 text-red-500 fill-current" />{" "}
            Next.JS
          </p>
        </div>
      </div>
    </footer>
  );
}