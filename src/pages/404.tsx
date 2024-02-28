import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md p-8 bg-white shadow-lg rounded-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">404 - Seite nicht gefunden</h2>
                <p className="text-gray-600">Die von Ihnen angeforderte Seite existiert nicht.</p>
                <p className="text-gray-600">Bitte überprüfen Sie die URL oder kehren Sie zur <Link className='text-indigo-500' to={'/'}>Startseite zurück</Link>.</p>
            </div>
        </div>
    );
}

export default NotFound;
