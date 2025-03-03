export default function FormatCaseNumber(caseData, judgeCategory) {
  if (caseData) {
    const {
      "Case No": caseNo,
      "Category Per PQS": category,
      "Date of Other Institution": otherInstitutionDate,
    } = caseData;

    // Convert judgeCategory to lowercase for case-insensitive comparison
    const categoryPrefix = judgeCategory?.toLowerCase().includes("civil judge")
      ? "Cr"
      : judgeCategory?.toLowerCase().includes("district")
      ? "SC"
      : "";

    // console.log("caseData:");
    // console.log(caseData);
    // Extract the numeric portion from the case number
    // const numericPart = caseNo?.match(/\d+/)?.[0] || "";
    // below code just extract the first whole number and not after the slash etc.
    // const numericPart = caseNo.match(/^\d+/)?.[0];

    // Extract the first standalone numeric part, excluding numbers after a slash (/)
    // const numericPart = caseNo.split('/')[0].match(/\b\d+\b/)?.[0] || ""; // Matches a whole number before a slash

    const numericPart = caseNo.split("/")[0].match(/\d+/)?.[0] || ""; // Extracts the number before a slash

    // if (!numericPart) {
    //   console.log("FCN error, number returned")
    //   return caseNo;
    // }

    // Define formats for each category
    // console.log(caseNo + " | " + category);
    const categoryFormats = {
      "Civil-001-Civil Suits (Original Jurisdiction)": (number) =>
        `Suit - ${number}/I`,
      "Civil-002-Civil Suit": (number) => `Suit - ${number}/I`,
      "Civil-003-Suits under Order 37 CPC": (number) => `Suit - ${number}/I`,
      "Civil-004-Custody of Minors": (number) => `COM - ${number}/6`,
      "Civil-006-Family Court Cases": (number) => `FC - ${number}/III`,
      "Civil-007-Succession Cases": (number) => `SuC - ${number}/IV`,
      "Civil-008-Guardianship Cases": (number) => `GD - ${number}/IV`,
      "Civil-009-Land Acquisition Cases": (number) => `LAA - ${number}/4`,
      "Civil-010-Rent Cases": (number) => `RC - ${number}/I`,
      "Civil-014-Execution in which periodic payments are made": (number) =>
        `Ex - ${number}/10`,
      "Civil-015-Execution Petitions": (number) => `Ex - ${number}/10`,
      "Civil-017-Others": (number) => `MA - ${number}/6`,
      "Civil-018-Other Civil Misc Applications": (number) => `MA - ${number}/6`,
      "Civil-019-Application under section 12(2) CPC": (number) =>
        `Case - ${number}/12(2)`,
      "Civil-021-Objection Petitions": (number) => `OP - ${number}/11`,
      "Civil-022-Civil Appeals": (number) => `CA - ${number}/13`,
      "Civil-023-Civil Revisions": (number) => `CivRev - ${number}/14c`,
      "Civil-025-Family Appeals": (number) => `${number}/FCA`,
      "Civil-026-Rent Appeals": (number) => `RA - ${number}/13`,
      "Civil-027-Civil Appeals against Orders": (number) =>
        `MCA - ${number}/14`,
      // "Revision": (number) => `Revision Case No. ${number}-RC`,
      // "Appeal": (number) => `Appeal No. ${number}/A`,
      Other: () => `${caseData["Case No"]}`,
      // "Other": () => `Case - `,
      // CRIMINAL CATEGORIES
      "CR-001-Homicide": (number) => `${categoryPrefix} - ${number}/II`,
      "CR-002-Attempt to Murder": (number) => `${categoryPrefix} - ${number}/II`,
      "CR-004-Hurt Cases": (number) => `${categoryPrefix} - ${number}/II`,
      "CR-006-Arms & Amunation": (number) => `AO - ${number}/III`,
      "CR-010-Complaint Cases": (number) => `Complaint - ${number}/IV`,
      "CR-011-Narcotics Substances": (number) => `CNSA - ${number}/II`,
      "CR-013-Offences against Children": (number) => `JJS - ${number}/III`,
      "CR-014-Offences Against Property": (number) => `${categoryPrefix} - ${number}/II`,
      "CR-015-Sexual Offences": (number) => `${categoryPrefix} - ${number}/II`,
      "CR-017-Proceedings u/s 514 Cr. P.C": (number) => `CR - ${number}/514`,
      "CR-026-Criminal Revisions": (number) => `CrRev - ${number}/10`,
      // "CR-020-Bail Applications": (number) => `BBA - ${number}/IV`,
    };

    // Determine the format based on category or default to "Other"
    const formatFunction =
      categoryFormats[category] || categoryFormats["Other"];

    // Get the formatted case number
    let formattedCaseNumber = formatFunction(numericPart);

    // Append "Neem" if "Date of Other Institution" exists
    if (otherInstitutionDate) {
      formattedCaseNumber += " Neem";
    }

    // console.log("format fun output:"+ formattedCaseNumber);
    return formattedCaseNumber;
  }
}
