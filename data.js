/* ============================================================
   COURSE DATA — edit here, the Courses page and the enquiry
   dropdowns update automatically.

   fees: set each value to a string such as "AED 1,500" or "INR 30,000".
   Leave as null to show "Ask admissions" until you confirm the
   current figures from the prospectus.
   Duration & eligibility below are typical values — VERIFY them
   against the RNTU prospectus before launch.
   ============================================================ */
const NO_FEES = { registration: null, course: null, program: null, total: null };

window.COURSES = {
  ug: [
    { id: "ba",   code: "BA",    name: "Bachelor of Arts — General",                    duration: "3 years", eligibility: "10+2 (or equivalent) from a recognized board.", specs: [], fees: NO_FEES },
    { id: "bba",  code: "BBA",   name: "Bachelor of Business Administration — General", duration: "3 years", eligibility: "10+2 (or equivalent) from a recognized board.", specs: [], fees: NO_FEES },
    { id: "bcom", code: "B.Com", name: "Bachelor of Commerce",                          duration: "3 years", eligibility: "10+2 (or equivalent) from a recognized board.", specs: [], fees: NO_FEES },
    { id: "bca",  code: "BCA",   name: "Bachelor of Computer Application",              duration: "3 years", eligibility: "10+2 (or equivalent) from a recognized board.", specs: [], fees: NO_FEES }
  ],
  pg: [
    { id: "msc",  code: "MSc",   name: "Master of Science", duration: "2 years", eligibility: "Bachelor's degree in a relevant subject from a recognized university.",
      specs: ["Physics", "Chemistry", "IT", "Mathematics"], fees: NO_FEES },
    { id: "ma",   code: "MA",    name: "Master of Arts", duration: "2 years", eligibility: "Bachelor's degree from a recognized university.",
      specs: ["Hindi", "Sociology", "Economics", "Political Science", "English"], fees: NO_FEES },
    { id: "msw",  code: "MSW",   name: "Master of Social Work", duration: "2 years", eligibility: "Bachelor's degree from a recognized university.", specs: [], fees: NO_FEES },
    { id: "mcom", code: "M.Com", name: "Master of Commerce", duration: "2 years", eligibility: "Bachelor's degree in commerce or a related field from a recognized university.", specs: [], fees: NO_FEES },
    { id: "mba",  code: "MBA",   name: "Master of Business Administration", duration: "2 years", eligibility: "Bachelor's degree from a recognized university.",
      specs: ["Finance & IT", "HR & Finance", "HR & IT", "Marketing & Finance", "Marketing & HR", "Marketing & IT"], fees: NO_FEES }
  ],
  // Placeholder short courses — replace with your real list and fees.
  short: [
    { id: "short-1", code: "Short course", name: "Course title goes here", duration: "Duration", description: "Add a one-line description of this certification or upskilling course.", fees: null, placeholder: true },
    { id: "short-2", code: "Short course", name: "Course title goes here", duration: "Duration", description: "Add a one-line description of this certification or upskilling course.", fees: null, placeholder: true },
    { id: "short-3", code: "Short course", name: "Course title goes here", duration: "Duration", description: "Add a one-line description of this certification or upskilling course.", fees: null, placeholder: true }
  ]
};
