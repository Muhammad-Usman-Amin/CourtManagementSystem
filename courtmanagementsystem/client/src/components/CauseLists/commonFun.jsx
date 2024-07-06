import { clsx } from 'clsx';

export function getActionEng(action) {
  const str = action.replace(/(^\s+|\s+$)/g, "");
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

// export function actionAbstract() {
//   return (
//     <>
//       <MenuItem value="" style={{ backgroundColor: "lightgray" }}>
//         <em>Mostly Used</em>
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"حاضری"}>
//         حاضری
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بحث"}>
//         بحث
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"شہادت"}>
//         شہادت
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"حکم"}>
//         حکم
//       </MenuItem>
//       <MenuItem value="" style={{ backgroundColor: "lightgrey" }}>
//         <em>All Categories</em>
//       </MenuItem>
//       <Divider />

//       <MenuItem
//         // className={[classes.boldThis, classes.uFont]}
//         className={clsx(classes.boldThis, classes.uFont)}
//         style={{ backgroundColor: "lightblue" }}
//         value={"حاضری، ریکارڈ"}
//       >
//         حاضری، ریکارڈ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"مختارنامہ، حاضری"}>
//         مختارنامہ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"تقرری وکیل، حاضری"}>
//         تقرری وکیل، حاضری
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"حاضری، وکالت نامہ، حاضری"}>
//         وکالت نامہ، حاضری
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"وکالت نامہ، حاضری"}>
//         وکالت نامہ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"حاضری، اشتہار"}>
//         حاضری، اشتہار
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"حاضری، جواب دعویٰ، حاضری"}>
//         حاضری، جواب دعویٰ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"جواب دعویٰ، حاضری"}>
//         جواب دعویٰ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"جواب درخواست، حاضری"}>
//         جواب درخواست
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"پروفارمہ جات، حاضری"}>
//         پروفارمہ جات
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"پروفارمہ ای، حاضری"}>
//         پرفارمہ ای
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"پروفارمہ سی، حاضری"}>
//         پرفارمہ سی
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"فرد جرم، حاضری"}>
//         فرد جرم
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"فرد تعلیقہ، حاضری"}>
//         فرد تعلیقہ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"راضی نامہ، حاضری"}>
//         راضی نامہ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بیلف رپورٹ، حاضری"}>
//         بیلف رپورٹ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"حاضری، بیلف رپورٹ، حاضری"}>
//         حاضری، بیلف رپورٹ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"نیلامی، حاضری"}>
//         نیلامی
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"نادرا رپورٹ، حاضری"}>
//         نادرا رپورٹ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بقایا آدائیگی، حاضری"}>
//         بقایا آدائیگی
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"مزید کاروائی، حاضری"}>
//         مزید کاروائی
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"انتظار مسل، حاضری"}>
//         انتظار مسل
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"کمنٹس، حاضری"}>
//         کمنٹس
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"رپورٹ SHO، حاضری"}>
//         رپورٹ SHO
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بیان DFC, حاضری"}>
//         بیان DFC
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"طلبی انکوائری، حاضری"}>
//         طلبی انکوائری، حاضری
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"ترمیمی عرضیدعویٰ، حاضری"}>
//         ترمیمی عرضیدعویٰ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"ترمیمی جواب دعویٰ، حاضری"}>
//         ترمیمی جواب دعویٰ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"ترمیمی جواب درخواست، حاضری"}>
//         ترمیمی جواب درخواست
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"حاضری، رپورٹ اہل کمیشن"}>
//         حاضری، رپورٹ اہل کمیشن
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"رپورٹ اہل کمیشن، حاضری"}>
//         رپورٹ اہل کمیشن
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"حاضری، عزرات"}>
//         حاضری، عزرات
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"عزرات، حاضری"}>
//         عزرات
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"شیڈولنگ کانفرنس، حاضری"}>
//         شیڈولنگ کانفرنس
//       </MenuItem>
//       <MenuItem className={classes.uFont} value="جواب الجواب، حاضری">
//         جواب الجواب
//       </MenuItem>
//       <MenuItem className={classes.uFont} value="شوکازنوٹس، حاضری">
//         شوکازنوٹس
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"ہمراہ، حاضری"}>
//         ہمراہ، حاضری
//       </MenuItem>
//       <Divider />

//       <MenuItem
//         // className={[classes.boldThis, classes.uFont]}
//         className={clsx(classes.boldThis, classes.uFont)}
//         style={{ backgroundColor: "lightgreen" }}
//         value={"شہادت مدعی"}
//       >
//         شہادت مدعی
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"تنقیحات، شہادت"}>
//         تنقیحات
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"شہادت مدعیہ"}>
//         شہادت مدعیہ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"شہادت مدعا علیہ"}>
//         شہادت مدعا علیہ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"شہادت مدعا علیہا"}>
//         شہادت مدعا علیہا
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"شہادت مدعیان"}>
//         شہادت مدعیان
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"شہادت مدعاعلیہم"}>
//         شہادت مدعا علیہم
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"شہادت سائیل"}>
//         شہادت سائیل
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"شہادت مسئول الیہ"}>
//         شہادت مسئول الیہ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"طلبیدہ گواہان، شہادت"}>
//         طلبیدہ گواہان، شہادت
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"جرح بر گواہان، شہادت"}>
//         جرح بر گواہان، شہادت
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"شہادت استغاثہ"}>
//         شہادت استغاثہ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"یکطرفہ شہادت"}>
//         یکطرفہ شہادت
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"جرح بر گواہ، شہادت"}>
//         جرح بر گواہ، شہادت
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"ہمراہ، شہادت"}>
//         ہمراہ، شہادت
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بیان اہل کمیشن، شہادت"}>
//         بیان اہل کمیشن
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"تحریری بیانات، شہادت"}>
//         تحریری بیانات
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بیان ملزم، شہادت"}>
//         بیان ملزم
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بیان ملزمان، شہادت"}>
//         بیان ملزمان
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"راضی نامہ، شہادت"}>
//         راضی نامہ
//       </MenuItem>
//       <Divider />

//       <MenuItem
//         // className={[classes.boldThis, classes.uFont]}
//         className={clsx(classes.boldThis, classes.uFont)}
//         style={{
//           backgroundColor: "lightsalmon",
//         }}
//         value={"ابتدائی بحث"}
//       >
//         ابتدائی بحث
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"جواب و بحث"}>
//         جواب و بحث
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بحث بر درخواست"}>
//         بحث بر درخواست
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بحث بر نکتہ"}>
//         بحث بر نکتہ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"یکطرفہ بحث"}>
//         یکطرفہ بحث
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بحث بر مقدمہ"}>
//         بحث بر مقدمہ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بقایا بحث"}>
//         بقایا بحث
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بحث، ریکارڈ"}>
//         بحث، ریکارڈ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بحث بر اپیل"}>
//         بحث بر اپیل
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بحث بر نگرانی"}>
//         بحث بر نگرانی
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"مصالحت ابتدائی، بحث"}>
//         مصالحت ابتدائی
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"مصالحت ثانی، بحث"}>
//         مصالحت ثانی
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"ہمراہ، بحث"}>
//         ہمراہ، بحث
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"بحث بر رپورٹ"}>
//         بحث بر رپورٹ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"راضی نامہ، بحث"}>
//         راضی نامہ
//       </MenuItem>
//       <Divider />

//       <MenuItem
//         // className={[classes.boldThis, classes.uFont]}
//         className={clsx(classes.boldThis, classes.uFont)}
//         style={{ backgroundColor: "lightcoral" }}
//         value={"حکم بر درخواست"}
//       >
//         حکم بر درخواست
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"حکم بر کمیشن"}>
//         حکم بر کمیشن
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"حکم یکطرفہ"}>
//         حکم یکطرفہ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"حکم بر مقدمہ"}>
//         حکم بر مقدمہ
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"راضی نامہ، حکم"}>
//         راضی نامہ، حکم
//       </MenuItem>
//       <MenuItem className={classes.uFont} value={"ہمراہ، حکم"}>
//         ہمراہ، حکم
//       </MenuItem>
//     </>
//   );
// }
