import { notFound } from 'next/navigation';

/** Toute adresse publique inconnue affiche la page 404 de la langue, avec un vrai statut 404. */
export default function CatchAllNotFound() {
  notFound();
}
