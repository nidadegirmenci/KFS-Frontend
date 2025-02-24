import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sol Kısım: İletişim Bilgileri ve Sosyal Medya */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              İletişim
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-500 dark:text-gray-400">
                <Mail className="w-5 h-5 mr-2" />
                <span>info@fonbul.com</span>
              </li>
              <li className="flex items-center text-gray-500 dark:text-gray-400">
                <Phone className="w-5 h-5 mr-2" />
                <span>+90 (212) 555 1234</span>
              </li>
              <li className="flex items-center text-gray-500 dark:text-gray-400">
                <MapPin className="w-5 h-5 mr-2" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Orta Kısım: Hakkımızda ve Destek */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Hakkımızda
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Şirket
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Kariyer
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Destek
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Yardım Merkezi
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Güvenlik
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Sağ Kısım: Yasal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Yasal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Kullanım Şartları
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-base text-gray-400 dark:text-gray-300 text-center">© 2023 FonBul. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

