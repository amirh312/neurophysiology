import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ارائه جامع نوروفیزیولوژی گفتار، شنوایی، شناخت و بلع | ارائه اساتید',
  description: 'سامانه و وب‌اپلیکیشن تعاملی ارائه پیشرفته نوروفیزیولوژی دستگاه گفتار، شناخت، اعصاب مغزی و بلع در جلسه اساتید | دانشکده علوم توانبخشی',
  openGraph: {
    title: 'ارائه جامع نوروفیزیولوژی گفتار، شنوایی، شناخت و بلع',
    description: 'وب‌اپلیکیشن مدرن ارائه نوروفیزیولوژی گفتاردرمانی همراه با شبیه‌سازها و نمودارهای تعاملی بالینی',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ارائه جامع نوروفیزیولوژی گفتار و بلع',
    description: 'وب‌اپلیکیشن تعاملی اسلایدهای نوروفیزیولوژی گفتاردرمانی',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fa" dir="rtl" className="scroll-smooth dark">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
