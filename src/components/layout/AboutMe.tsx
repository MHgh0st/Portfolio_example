"use client";
import AboutMeImage from "../AboutMeImage";
export default function AboutMe() {
  return (
    <div
      id="About-Me"
      className="absolute inset-0 z-[1] flex items-center justify-between px-30"
    >
      <p id="AboutMeText" className="text-lg leading-10">
        توسعه‌دهنده Front-End متخصص با تمرکز روی React.js و تکنولوژی‌های مدرن
        وب. با بیش از سه سال تجربه عملی در توسعه اپلیکیشن‌های تعاملی و
        کاربرپسند، مهارت‌های قوی در TypeScript، Next.js و ابزارهای مدرن
        JavaScript دارم.
        <br />
        علاقه‌مند به ایجاد تجربه‌های کاربری بهینه و حل مسائل پیچیده، تجربه کار
        با پروژه‌های متنوع از جمله سیستم‌های تجارت الکترونیک، پلتفرم‌های مدیریت
        داده، اپلیکیشن‌های هوش مصنوعی و پروژه‌های تخصصی پزشکی را دارم. در تمامی
        پروژه‌هایم، اصول Clean Code و Best Practices را رعایت می‌کنم.
        <br />
        به‌عنوان فردی که همواره در حال یادگیری است، دوست دارم در تیم‌های حرفه‌ای
        فعالیت کنم تا هم سهم مؤثری در پیشرفت پروژه‌ها داشته باشم و هم مهارت‌هایم
        را در کنار متخصصان باتجربه توسعه دهم. آماده همکاری در پروژه‌های
        چالش‌برانگیز و تأثیرگذار هستم.
      </p>
      <AboutMeImage id="AboutMeImage" className="flex-shrink-0" />
    </div>
  );
}
