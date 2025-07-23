<!-- Sidebar Component -->
<div class="sidebar">
  <div class="logo">
    <img
      src="https://img.icons8.com/color/48/000000/school-building.png"
      alt="Logo"
    />
    Admin Panel
  </div>
  <nav>
    <ul>
      <li>
        <a href="dashboard.php" class="active"
          ><i class="fa fa-th-large"></i
          ><span class="menu-label">Dashboard</span
          ><span class="badge">New</span></a
        >
      </li>
      <li class="has-submenu" id="locationDirectoryMenu">
        <button class="menu-btn" onclick="toggleLocationDirectory()"> 
          <i class="fa fa-database"></i
          ><span class="menu-label">Location Directory</span>
          <i
            class="fa fa-chevron-down"
            id="locationChevron"
            style="margin-left: auto"
          ></i>
        </button>
        <ul
          class="submenu"
          id="locationDirectoryDropdown"
          style="background: #f4f6fa"
        >
          <li>
            <a
              href="country.php"
              onclick="keepSubmenuOpen('locationDirectoryDropdown', 'locationChevron')"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Country</a
            >
          </li>
          <li>
            <a
              href="state.php"
              onclick="keepSubmenuOpen('locationDirectoryDropdown', 'locationChevron')"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >State</a
            >
          </li>
          <li>
            <a
              href="district.php"
              onclick="keepSubmenuOpen('locationDirectoryDropdown', 'locationChevron')"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >District</a
            >
          </li>
        </ul>
      </li>
      <li class="has-submenu" id="masterDataMenu">
        <button class="menu-btn" onclick="toggleMasterData()">
          <i class="fa fa-database"></i
          ><span class="menu-label">Master Data</span>
          <i
            class="fa fa-chevron-down"
            id="masterChevron"
            style="margin-left: auto"
          ></i>
        </button>
        <ul
          class="submenu"
          id="masterDataDropdown"
          style="background: #343b43"
        >
          <li>
            <a
              href="stream.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Stream</a
            >
          </li>
          <li>
            <a
              href="degreetype.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Degree Type</a
            >
          </li>
          <li>
            <a
              href="coursename.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Course Name</a
            >
          </li>
          <li>
            <a
              href="subcoursebranch.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Sub-Course Branch</a
            >
          </li>
          <li>
            <a
              href="courseduration.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Course Duration</a
            >
          </li>
          <li>
            <a
              href="affiliationname.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Affiliation Name</a
            >
          </li>
          <li>
            <a
              href="approvedthrough.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Approved Through</a
            >
          </li>
          <li>
            <a
              href="examthrough.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Exam Through</a
            >
          </li>
          <li>
            <a
              href="ranking.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Ranking</a
            >
          </li>
          <li>
            <a
              href="ownership.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Ownership</a
            >
          </li>
          <li>
            <a
              href="college-facilities.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >College-Facilities</a
            >
          </li>
        </ul>
      </li>
      <li class="has-submenu" id="collegeMasterMenu">
        <button class="menu-btn" onclick="toggleCollegeMaster()">
          <i class="fa fa-university"></i
          ><span class="menu-label">College Master</span>
          <i
            class="fa fa-chevron-down"
            id="collegeChevron"
            style="margin-left: auto"
          ></i>
        </button>
        <ul
          class="submenu"
          id="collegeMasterDropdown"
          style="background: #343b43"
        >
          <li>
            <a
              href="addcollege.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Add College</a
            >
          </li>
          <li>
            <a
              href="collegelist.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >College List</a
            >
          </li>
          <li>
            <a
              href="collegeview.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >College View</a
            >
          </li>
        </ul>
      </li>
      <li class="has-submenu" id="examMasterMenu">
        <button class="menu-btn" onclick="toggleExamMaster()">
          <i class="fa fa-file-alt"></i
          ><span class="menu-label">Exam Master</span>
          <i
            class="fa fa-chevron-down"
            id="examChevron"
            style="margin-left: auto"
          ></i>
        </button>
        <ul
          class="submenu"
          id="examMasterDropdown"
          style="background: #343b43"
        >
          <li>
            <a
              href="examlevel.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Exam Level</a
            >
          </li>
          <li>
            <a
              href="addexam.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Add Exam</a
            >
          </li>
          <li>
            <a
              href="examlist.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Exam List</a
            >
          </li>
        </ul>
      </li>
      <li class="has-submenu" id="advMasterMenu">
        <button class="menu-btn" onclick="toggleAdvMaster()">
          <span
            style="
              font-size: 1.1em;
              background: #fff;
              color: #232b35;
              border-radius: 3px;
              padding: 2px 6px;
              margin-right: 8px;
              font-weight: bold;
            "
            >Ad</span
          ><span class="menu-label">Adv. Master</span>
          <i
            class="fa fa-chevron-down"
            id="advChevron"
            style="margin-left: auto"
          ></i>
        </button>
        <ul
          class="submenu"
          id="advMasterDropdown"
          style="background: #343b43"
        >
          <li>
            <a
              href="newadv.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >New Adv.</a
            >
          </li>
          <li>
            <a
              href="advlist.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Adv List</a
            >
          </li>
        </ul>
      </li>
      <li class="has-submenu" id="enquiryDataMenu">
        <button class="menu-btn" onclick="toggleEnquiryData()">
          <i class="fa fa-users"></i
          ><span class="menu-label">Enquiry Data</span>
          <i
            class="fa fa-chevron-down"
            id="enquiryChevron"
            style="margin-left: auto"
          ></i>
        </button>
        <ul
          class="submenu"
          id="enquiryDataDropdown"
          style="background: #343b43"
        >
          <li>
            <a
              href="registrationdata.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Registration Data</a
            >
          </li>
          <li>
            <a
              href="signupdata.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Signup Data</a
            >
          </li>
          <li>
            <a
              href="enquirydata.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Enquiry Data</a
            >
          </li>
        </ul>
      </li>
      <li class="has-submenu" id="extraPagesMenu">
        <button class="menu-btn" onclick="toggleExtraPages()">
          <i class="fa fa-cog"></i
          ><span class="menu-label">Extra Pages</span>
          <i
            class="fa fa-chevron-down"
            id="extraPagesChevron"
            style="margin-left: auto"
          ></i>
        </button>
        <ul
          class="submenu"
          id="extraPagesDropdown"
          style="background: #343b43"
        >
          <li>
            <a
              href="pagecreate.html"
              style="
                color: inherit;
                text-decoration: none;
                padding-left: 40px;
              "
              >Page Create</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </nav>
  <a href="#" class="logout"><i class="fa fa-sign-out-alt"></i>Logout</a>
</div>