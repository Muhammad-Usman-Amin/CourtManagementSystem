import { clsx } from 'clsx';

export function getActionEng(action) {
  const str = action?.replace(/(^\s+|\s+$)/g, "");
  switch (str) {
    case "حاضری":
    case "وکالت نامہ":
    case "حاضری، ریکارڈ":
    case "حاضری، اشتہار":
    case "مختارنامہ":
      return "Attendance";
    case "جواب دعویٰ":
      return "Written Statement";
    case "ترمیمی جواب دعویٰ":
      return "Amended Wrtitten Statement";
    case "ترمیمی عرضیدعویٰ":
      return "Amended Plaint";
    case "جواب و بحث":
    case "جواب درخواست":
      return "Replication";
    case "فرد تعلیقہ":
      return "Attachment Order";
    case "پروفارمہ ای":
      return "Proformas";
    case "شیڈولنگ کانفرنس":
      return "Scheduling Conference"
    case "تنقیحات":
      return "Framing of Issues";
    case "جرح بر گواہ":
    case "شہادت":
    case "طلبیدہ گواہان":
    case "شہادت استغاثہ":
      return "Evidence";
    case "شہادت سائیل":
      return "Petitioner Evidence";
    case "شہادت مسئول الیہ":
      return "Respondent Evidence";
    case "یکطرفہ شہادت":
      return "Ex-parte Evidence";
    case "شہادت مدعی":
      return "Plaintiff Evidence";
    case "شہادت مدعیہ":
      return "Plaintiff Evidence";
    case "شہادت مدعاعلیہم":
      return "Defendants Evidence";
    case "شہادت مدعیان":
      return "Plaintiffs Evidence";
    case "بیلف رپورٹ":
    case "حاضری، بیلف رپورٹ":
      return "Bailiff's Report";
    case "نادرا رپورٹ":
      return "NADRA's Report";
    case "شہادت مدعا علیہ":
      return "Defendant Evidence";
    case "راضی نامہ":
      return "Compromise";
    case "مصالحت ابتدائی":
      return "Pre-Reconciliation";
    case "مصالحت ثانی":
      return "Post-Reconciliation";
    case "بقایا بحث":
      return "Remaining Arguments";
    case "بحث، ریکارڈ":
      return "Arguments on Application";
    case "بحث":
      return "Arguments";
    case "بحث بر مقدمہ":
      return "Final Arguments";
    case "یکطرفہ بحث":
      return "ex-parte Arguments";
    case "بحث بر درخواست":
      return "Arguments on Application";
    case "حکم بر درخواست":
      return "Order on Application";
    case "حکم":
      return "Order";
    case "حکم بر مقدمہ":
      return "Final Order";
    case "مزید کاروائی":
      return "Others";
    case "انتظار مسل":
      return "Others";
    case "ہمراہ":
      return "Attached";
    case "بقایا آدائیگی":
      return "Remaining Payment";
    default:
      return str;
  }
}