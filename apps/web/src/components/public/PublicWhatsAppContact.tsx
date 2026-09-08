import { MessageCircle } from 'lucide-react';

const whatsappUrl =
  'https://wa.me/5533999771454?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20o%20RH%20do%20Coelho%20Diniz.';

export const PublicWhatsAppContact = () => (
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar com o RH do Coelho Diniz pelo WhatsApp"
    className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-pill bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
  >
    <MessageCircle className="h-5 w-5" aria-hidden="true" />
    <span>Falar com o RH</span>
  </a>
);

export const PublicWhatsAppCta = () => (
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 inline-flex items-center gap-2 text-body-sm font-semibold text-yellow-300 transition-colors hover:text-white"
  >
    <MessageCircle className="h-4 w-4" aria-hidden="true" />
    Fale com o RH pelo WhatsApp: (33) 99977-1454
  </a>
);
