<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Country Management</title>
  <link href="./css/style.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
  <style>
    body { margin: 0; background: #f4f6fa; font-family: 'Segoe UI', Arial, sans-serif; }
    .main { margin-left: 260px; padding: 32px 24px 24px 24px; min-height: 100vh; }
    /* Add/override any country-specific styles here if needed */
  </style>
</head>
<body>
  <!-- Sidebar (same as dashboard) -->
  <div class="sidebar">
    <div class="logo">
      <img src="https://img.icons8.com/color/48/000000/school-building.png" alt="Logo" />
      Admin Panel
    </div>
    <nav>
      <ul>
        <li><a href="dashboard.html"><i class="fa fa-th-large"></i><span class="menu-label">Dashboard</span><span class="badge">New</span></a></li>
        <li class="has-submenu" id="locationDirectoryMenu">
          <button class="menu-btn" onclick="toggleLocationDirectory()">
            <i class="fa fa-database"></i><span class="menu-label">Location Directory</span>
            <i class="fa fa-chevron-down" id="locationChevron" style="margin-left: auto"></i>
          </button>
          <ul class="submenu" id="locationDirectoryDropdown" style="background: #f4f6fa">
            <li><a href="country.php" style="color: inherit; text-decoration: none; padding-left: 40px;">Country</a></li>
            <li><a href="state.html" style="color: inherit; text-decoration: none; padding-left: 40px;">State</a></li>
            <li><a href="district.html" style="color: inherit; text-decoration: none; padding-left: 40px;">District</a></li>
          </ul>
        </li>
        <li class="has-submenu" id="masterDataMenu">
          <button class="menu-btn" onclick="toggleMasterData()">
            <i class="fa fa-database"></i><span class="menu-label">Master Data</span>
            <i class="fa fa-chevron-down" id="masterChevron" style="margin-left: auto"></i>
          </button>
          <ul class="submenu" id="masterDataDropdown" style="background: #343b43">
            <li><a href="stream.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Stream</a></li>
            <li><a href="degreetype.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Degree Type</a></li>
            <li><a href="coursename.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Course Name</a></li>
            <li><a href="subcoursebranch.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Sub-Course Branch</a></li>
            <li><a href="courseduration.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Course Duration</a></li>
            <li><a href="affiliationname.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Affiliation Name</a></li>
            <li><a href="approvedthrough.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Approved Through</a></li>
            <li><a href="examthrough.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Exam Through</a></li>
            <li><a href="ranking.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Ranking</a></li>
            <li><a href="ownership.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Ownership</a></li>
            <li><a href="college-facilities.html" style="color: inherit; text-decoration: none; padding-left: 40px;">College-Facilities</a></li>
          </ul>
        </li>
        <li class="has-submenu" id="collegeMasterMenu">
          <button class="menu-btn" onclick="toggleCollegeMaster()">
            <i class="fa fa-university"></i><span class="menu-label">College Master</span>
            <i class="fa fa-chevron-down" id="collegeChevron" style="margin-left: auto"></i>
          </button>
          <ul class="submenu" id="collegeMasterDropdown" style="background: #343b43">
            <li><a href="addcollege.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Add College</a></li>
            <li><a href="collegelist.html" style="color: inherit; text-decoration: none; padding-left: 40px;">College List</a></li>
            <li><a href="collegeview.html" style="color: inherit; text-decoration: none; padding-left: 40px;">College View</a></li>
          </ul>
        </li>
        <li class="has-submenu" id="examMasterMenu">
          <button class="menu-btn" onclick="toggleExamMaster()">
            <i class="fa fa-file-alt"></i><span class="menu-label">Exam Master</span>
            <i class="fa fa-chevron-down" id="examChevron" style="margin-left: auto"></i>
          </button>
          <ul class="submenu" id="examMasterDropdown" style="background: #343b43">
            <li><a href="examlevel.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Exam Level</a></li>
            <li><a href="addexam.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Add Exam</a></li>
            <li><a href="examlist.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Exam List</a></li>
          </ul>
        </li>
        <li class="has-submenu" id="advMasterMenu">
          <button class="menu-btn" onclick="toggleAdvMaster()">
            <span style="font-size: 1.1em; background: #fff; color: #232b35; border-radius: 3px; padding: 2px 6px; margin-right: 8px; font-weight: bold;">Ad</span><span class="menu-label">Adv. Master</span>
            <i class="fa fa-chevron-down" id="advChevron" style="margin-left: auto"></i>
          </button>
          <ul class="submenu" id="advMasterDropdown" style="background: #343b43">
            <li><a href="newadv.html" style="color: inherit; text-decoration: none; padding-left: 40px;">New Adv.</a></li>
            <li><a href="advlist.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Adv List</a></li>
          </ul>
        </li>
        <li class="has-submenu" id="enquiryDataMenu">
          <button class="menu-btn" onclick="toggleEnquiryData()">
            <i class="fa fa-users"></i><span class="menu-label">Enquiry Data</span>
            <i class="fa fa-chevron-down" id="enquiryChevron" style="margin-left: auto"></i>
          </button>
          <ul class="submenu" id="enquiryDataDropdown" style="background: #343b43">
            <li><a href="registrationdata.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Registration Data</a></li>
            <li><a href="signupdata.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Signup Data</a></li>
            <li><a href="enquirydata.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Enquiry Data</a></li>
          </ul>
        </li>
        <li class="has-submenu" id="extraPagesMenu">
          <button class="menu-btn" onclick="toggleExtraPages()">
            <i class="fa fa-cog"></i><span class="menu-label">Extra Pages</span>
            <i class="fa fa-chevron-down" id="extraPagesChevron" style="margin-left: auto"></i>
          </button>
          <ul class="submenu" id="extraPagesDropdown" style="background: #343b43">
            <li><a href="pagecreate.html" style="color: inherit; text-decoration: none; padding-left: 40px;">Page Create</a></li>
          </ul>
        </li>
      </ul>
    </nav>
    <a href="#" class="logout"><i class="fa fa-sign-out-alt"></i>Logout</a>
  </div>
  <!-- Main content area -->
  <div class="main">
    <!-- Country management content (form/list) -->
    <div class="main-container">
      <div class="top-btns">
        <button id="showFormBtn" class="main-btn"><span>➕</span> Add Record</button>
        <button id="showListBtn" class="main-btn"><span>📋</span> Record List</button>
      </div>
      <div class="form-container" id="formDiv" style="display: none">
        <h2>Add Country</h2>
        <form id="countryForm" enctype="multipart/form-data">
          <label>Name:</label>
          <input type="text" name="name" required />
          <label>Code:</label>
          <input type="text" name="code" required />
          <label>Description:</label>
          <textarea name="description" required rows="4"></textarea>
          <div class="file-input">
            <label>Logo:</label>
            <input type="file" name="logo" />
          </div>
          <div class="file-input">
            <label>Flag:</label>
            <input type="file" name="flag" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div class="list-container" id="listDiv" style="display: block">
        <h2>Country List</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody id="countryTable"></tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- Sidebar submenu JS (same as dashboard) -->
  <script>
    function toggleSubmenu(dropdownId, chevronId) {
      var dropdown = document.getElementById(dropdownId);
      var chevron = document.getElementById(chevronId);
      if (!dropdown.classList.contains("open")) {
        dropdown.classList.add("open");
        chevron.style.transform = "rotate(180deg)";
      } else {
        dropdown.classList.remove("open");
        chevron.style.transform = "rotate(0deg)";
      }
    }
    function toggleLocationDirectory() { toggleSubmenu("locationDirectoryDropdown", "locationChevron"); }
    function toggleMasterData() { toggleSubmenu("masterDataDropdown", "masterChevron"); }
    function toggleCollegeMaster() { toggleSubmenu("collegeMasterDropdown", "collegeChevron"); }
    function toggleExamMaster() { toggleSubmenu("examMasterDropdown", "examChevron"); }
    function toggleAdvMaster() { toggleSubmenu("advMasterDropdown", "advChevron"); }
    function toggleEnquiryData() { toggleSubmenu("enquiryDataDropdown", "enquiryChevron"); }
    function toggleExtraPages() { toggleSubmenu("extraPagesDropdown", "extraPagesChevron"); }
    // Country form/list JS
    const showFormBtn = document.getElementById("showFormBtn");
    const showListBtn = document.getElementById("showListBtn");
    const formDiv = document.getElementById("formDiv");
    const listDiv = document.getElementById("listDiv");
    const countryForm = document.getElementById("countryForm");
    const countryTable = document.getElementById("countryTable");
    let countries = [];
    showFormBtn.onclick = () => { formDiv.style.display = ""; listDiv.style.display = "none"; };
    showListBtn.onclick = () => { formDiv.style.display = "none"; listDiv.style.display = ""; renderTable(); };
    countryForm.onsubmit = function (e) {
      e.preventDefault();
      const name = countryForm.name.value.trim();
      const code = countryForm.code.value.trim();
      const description = countryForm.description.value.trim();
      if (name && code && description) {
        countries.push({ name, code, description });
        countryForm.reset();
        formDiv.style.display = "none";
        listDiv.style.display = "";
        renderTable();
      }
    };
    function renderTable() {
      countryTable.innerHTML = countries.map((c, i) => `<tr><td>${i + 1}</td><td>${c.name}</td><td>${c.code}</td><td>${c.description}</td></tr>`).join("");
    }
    renderTable();
  </script>
</body>
</html>
