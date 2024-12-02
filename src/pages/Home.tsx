import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Mitarbeiter des Monats</span>
          <span className="block text-indigo-600">Bilder mit Stil</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Erstellen Sie hochwertige Mitarbeiter des Monats Bilder mit eleganten Rahmen. 
          Perfekt für Ihr Büro oder als Geschenk für das ganze Team.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              to="/editor"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Jetzt gestalten
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Special Offer Banner */}
      <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-indigo-900">Weihnachts-Special!</h2>
            <p className="mt-1 text-indigo-700">
              20% Rabatt auf Team-Bestellungen ab 5 Bildern
            </p>
          </div>
          <Link
            to="/editor"
            className="flex items-center text-indigo-600 hover:text-indigo-500"
          >
            Jetzt sparen
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Hochwertige Rahmen</h3>
          <p className="mt-2 text-gray-600">
            Wählen Sie aus verschiedenen eleganten Rahmen in Gold, Silber oder Holz.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Einfache Gestaltung</h3>
          <p className="mt-2 text-gray-600">
            Intuitiver Editor für die perfekte Bildanpassung und Personalisierung.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Schnelle Lieferung</h3>
          <p className="mt-2 text-gray-600">
            Professioneller Druck und sichere Lieferung direkt zu Ihnen.
          </p>
        </div>
      </div>
    </div>
  );
}