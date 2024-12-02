import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">
                MitarbeiterBild.de
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/editor"
              className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Bild erstellen
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}