<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Dashboard</title>
    <link href="./css/style.css" rel="stylesheet" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />
    <style>
      body {
        margin: 0;
        font-family: "Segoe UI", Arial, sans-serif;
        background: #f4f6fa;
      }
      .sidebar {
        background: #232b35;
        color: #fff;
        width: 260px;
        min-height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        z-index: 10;
        box-shadow: 2px 0 16px rgba(0, 0, 0, 0.08);
      }
      .sidebar .logo {
        display: flex;
        align-items: center;
        padding: 24px 20px 16px 20px;
        font-size: 1.5rem;
        font-weight: bold;
        flex-shrink: 0;
        letter-spacing: 0.5px;
      }
      .sidebar .logo img {
        width: 40px;
        height: 40px;
        margin-right: 12px;
      }
      .sidebar nav {
        flex: 1 1 auto;
        overflow-y: auto;
        min-height: 0;
        max-height: calc(100vh - 140px);
        padding-bottom: 16px;
      }
      .sidebar ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .sidebar li {
        margin-bottom: 4px;
      }
      .sidebar a,
      .sidebar button.menu-btn {
        display: flex;
        align-items: center;
        padding: 12px 20px;
        color: #fff;
        text-decoration: none;
        font-size: 0.98rem;
        font-weight: 500;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
        border-radius: 6px;
        transition: background 0.2s;
        letter-spacing: 0.2px;
      }
      .sidebar a i,
      .sidebar button.menu-btn i {
        font-size: 1.1em;
      }
      .sidebar a.active,
      .sidebar a:hover,
      .sidebar button.menu-btn:hover {
        background: #2563eb;
        color: #fff;
      }
      .sidebar .logout {
        background: #e74c3c;
        color: #fff;
        margin: 20px 20px 30px 20px;
        border-radius: 8px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        padding: 14px 0;
        width: calc(100% - 40px);
        box-shadow: 0 2px 8px rgba(231, 76, 60, 0.08);
        letter-spacing: 0.5px;
        transition: background 0.2s, box-shadow 0.2s;
        flex-shrink: 0;
      }
      .sidebar .logout i {
        font-size: 1.3em;
        margin-right: 10px;
      }
      .sidebar .logout:hover {
        background: #c0392b;
        box-shadow: 0 4px 16px rgba(231, 76, 60, 0.18);
      }
      .sidebar .menu-label {
        margin-left: 12px;
        flex: 1;
        font-weight: 600;
      }
      .sidebar .badge {
        background: #e11d48;
        color: #fff;
        font-size: 0.75rem;
        padding: 2px 8px;
        border-radius: 12px;
        margin-left: 8px;
        font-weight: 600;
      }
      .main {
        margin-left: 260px;
        padding: 32px 24px 24px 24px;
        min-height: 100vh;
        transition: margin-left 0.3s;
        max-width: 1400px;
        margin-right: auto;
        margin-left: 260px;
      }
      .main-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
      }
      .main-header h1 {
        color: #d32f2f;
        font-size: 2rem;
        font-weight: 600;
        margin: 0;
      }
      .breadcrumb {
        color: #2563eb;
        font-size: 1rem;
      }
      .dashboard-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }
      .card {
        border-radius: 14px;
        color: #fff;
        padding: 20px 18px 12px 18px;
        position: relative;
        overflow: hidden;
        min-height: 90px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      }
      .card .card-title {
        font-size: 1.08rem;
        font-weight: 600;
        margin-bottom: 8px;
      }
      .card .card-value {
        font-size: 2rem;
        font-weight: bold;
        margin: 0 0 10px 0;
      }
      .card .more-info {
        background: rgba(0, 0, 0, 0.1);
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 8px 18px;
        font-size: 1rem;
        cursor: pointer;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        transition: background 0.2s;
        margin-top: 8px;
      }
      .card .more-info:hover {
        background: rgba(0, 0, 0, 0.18);
      }
      .card-blue {
        background: #1793b2;
      }
      .card-orange {
        background: #f6a623;
      }
      .card-purple {
        background: #6c63ff;
      }
      .card-red {
        background: #f44336;
      }
      .card-green {
        background: #1abc3c;
      }
      .card-pink {
        background: #e040fb;
      }
      .card-grey {
        background: #757575;
      }
      .card-yellow {
        background: #f7d51d;
        color: #333;
      }
      .card-brown {
        background: #bca17a;
      }
      .card-cyan {
        background: #26c6da;
      }
      .card-lime {
        background: #cddc39;
        color: #333;
      }
      .card-teal {
        background: #009688;
      }
      .card-mauve {
        background: #b388ff;
      }
      .card-tan {
        background: #d2b48c;
        color: #333;
      }
      .card-darkcyan {
        background: #008b8b;
      }
      .card-lightblue {
        background: #03a9f4;
      }
      .card-darkpink {
        background: #ad1457;
      }
      .card-darkgrey {
        background: #455a64;
      }
      .footer {
        margin-top: 40px;
        text-align: center;
        color: #888;
        font-size: 1rem;
      }
      .footer a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 500;
      }
      .footer a:hover {
        text-decoration: underline;
      }
      .submenu {
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
        background: #343b43;
        margin: 0;
        padding: 0;
        position: static;
      }
      .submenu.open {
        max-height: 1000px;
        opacity: 1;
        overflow: visible;
      }
      .menu-btn {
        display: flex;
        align-items: center;
        width: 100%;
        background: none;
        border: none;
        color: inherit;
        font-size: 1rem;
        font-weight: 500;
        padding: 12px 20px;
        cursor: pointer;
        border-radius: 6px;
        transition: background 0.2s;
      }
      .menu-btn:focus,
      .menu-btn:hover {
        background: #2563eb;
        color: #fff;
      }
      .submenu li a {
        background: #fff;
        color: #232b35 !important;
        border-radius: 0;
        margin: 0;
        padding: 16px 24px 16px 40px !important;
        font-size: 1rem;
        display: block;
        font-weight: 500;
        transition: background 0.18s, color 0.18s;
        border: none;
        border-bottom: 2px solid #f4f6fa;
        box-shadow: none;
      }
      .submenu li:last-child a {
        border-bottom: none;
      }
      .submenu li {
        border: none;
        border-bottom: none;
        border-top: none;
        background: transparent;
        box-shadow: none;
      }
      .submenu li a.active,
      .submenu li a:focus,
      .submenu li a:hover {
        background: #2563eb;
        color: #fff !important;
      }
      @media (max-width: 900px) {
        .main {
          margin-left: 0;
          padding: 12px 4vw 12px 4vw;
          max-width: 100vw;
        }
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 80vw;
          max-width: 340px;
          min-width: 220px;
          z-index: 100;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 2px 0 16px rgba(0, 0, 0, 0.12);
        }
        .sidebar.open {
          transform: translateX(0);
        }
        .sidebar nav {
          max-height: none;
          overflow-y: auto;
          min-height: 0;
          padding-bottom: 16px;
        }
        .sidebar-overlay {
          display: block;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.25);
          z-index: 99;
          transition: opacity 0.2s;
        }
        .sidebar-overlay.hide {
          display: none;
        }
        .main-header {
          padding-left: 0;
        }
        .dashboard-cards {
          grid-template-columns: 1fr;
          gap: 14px;
          max-width: 100vw;
        }
        .card {
          padding: 14px 10px 8px 10px;
          min-height: 60px;
          border-radius: 10px;
        }
        .card .card-title {
          font-size: 1rem;
          margin-bottom: 4px;
        }
        .card .card-value {
          font-size: 1.3rem;
          margin-bottom: 4px;
        }
        .card .more-info {
          font-size: 0.98rem;
          padding: 7px 12px;
          border-radius: 5px;
          margin-top: 4px;
        }
      }
      @media (max-width: 600px) {
        .main {
          padding: 8px 2vw 8px 2vw;
        }
        .dashboard-cards {
          gap: 12px;
          margin: 0;
        }
        .card {
          padding: 14px 10px 10px 10px;
          min-height: 70px;
          border-radius: 12px;
          margin: 0;
        }
        .card .card-title {
          font-size: 1.08rem;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .card .card-value {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .card .more-info {
          font-size: 1rem;
          padding: 7px 12px;
          border-radius: 6px;
          margin-top: 6px;
        }
      }
      .hamburger {
        display: none;
        position: absolute;
        left: 18px;
        top: 18px;
        z-index: 110;
        background: none;
        border: none;
        font-size: 2rem;
        color: #232b35;
        cursor: pointer;
      }
      @media (max-width: 900px) {
        .hamburger {
          display: block;
        }
      }
      body.fullscreen-active .sidebar,
      body.fullscreen-active .hamburger {
        display: none !important;
      }
      body.fullscreen-active .main {
        margin-left: 0 !important;
        max-width: 100vw !important;
        width: 100vw !important;
      }
      body.fullscreen-active .topbar {
        display: none !important;
      }
    </style>
  </head>
  <body>
    <!-- Top Bar -->
    <div
      class="topbar"
      style="
        width: 100%;
        background: #22d3a7;
        min-height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 2;
      "
    >
      <button
        class="hamburger"
        id="sidebarToggle"
        aria-label="Open sidebar"
        style="
          position: static;
          margin-left: 18px;
          margin-right: 0;
          font-size: 2rem;
          background: none;
          border: none;
          color: #232b35;
        "
      >
        <i class="fa fa-bars"></i>
      </button>
      <span style="flex: 1"></span>
      <button
        style="
          background: none;
          border: none;
          margin-right: 18px;
          font-size: 1.5rem;
          color: #232b35;
          cursor: pointer;
        "
        id="fullscreenToggle"
        aria-label="Toggle fullscreen"
      >
        <i class="fa fa-expand-arrows-alt"></i>
      </button>
    </div>
    <div class="sidebar-overlay hide" id="sidebarOverlay"></div>
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
            <a href="#" class="active"
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
                  href="state.html"
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
                  href="district.html"
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
    <div class="main">
      <div class="main-header">
        <h1>
          <a
            href="./dashboard.html"
            style="color: inherit; text-decoration: none"
          >
            <i class="fa fa-tachometer-alt"></i>
          </a>
          Admin Dashboard
        </h1>
        <div class="breadcrumb">Home / Dashboard</div>
      </div>
      <div class="dashboard-cards">
        <a href="country.html" style="text-decoration: none">
          <div class="card card-blue">
            <div class="card-title" style="color: inherit">Country</div>
            <div class="card-value">248</div>
            <span class="more-info"
              >More info <i class="fa fa-arrow-circle-right"></i
            ></span>
          </div>
        </a>
        <div class="card card-orange">
          <div class="card-title">State</div>
          <div class="card-value">4140</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-purple">
          <div class="card-title">District</div>
          <div class="card-value">6208</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-red">
          <div class="card-title">Stream</div>
          <div class="card-value">12</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-green">
          <div class="card-title">Degree Type</div>
          <div class="card-value">10</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-pink">
          <div class="card-title">Course Name</div>
          <div class="card-value">221</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-grey">
          <div class="card-title">Course Branch</div>
          <div class="card-value">861</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-brown">
          <div class="card-title">Course Duration</div>
          <div class="card-value">7</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-red">
          <div class="card-title">Affiliation</div>
          <div class="card-value">7</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-yellow">
          <div class="card-title">Exam Type</div>
          <div class="card-value">137</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-mauve">
          <div class="card-title">Ranking</div>
          <div class="card-value">15</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-cyan">
          <div class="card-title">Ownership</div>
          <div class="card-value">10</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-tan">
          <div class="card-title">College Facilities</div>
          <div class="card-value">35</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-darkcyan">
          <div class="card-title">College List</div>
          <div class="card-value">4506</div>
          <a href="#" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
      </div>
      <div class="footer">
        Copyright &copy; 2025 <a href="#">Shish Technology</a>. All rights
        reserved.
        <span style="float: right; color: #aaa">Version 1.1.0</span>
      </div>
    </div>
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
      function toggleLocationDirectory() {
        toggleSubmenu("locationDirectoryDropdown", "locationChevron");
      }
      function toggleMasterData() {
        toggleSubmenu("masterDataDropdown", "masterChevron");
      }
      function toggleCollegeMaster() {
        toggleSubmenu("collegeMasterDropdown", "collegeChevron");
      }
      function toggleExamMaster() {
        toggleSubmenu("examMasterDropdown", "examChevron");
      }
      function toggleAdvMaster() {
        toggleSubmenu("advMasterDropdown", "advChevron");
      }
      function toggleEnquiryData() {
        toggleSubmenu("enquiryDataDropdown", "enquiryChevron");
      }
      function toggleExtraPages() {
        toggleSubmenu("extraPagesDropdown", "extraPagesChevron");
      }
      // Sidebar toggle for mobile
      const sidebar = document.querySelector(".sidebar");
      const sidebarToggle = document.getElementById("sidebarToggle");
      const sidebarOverlay = document.getElementById("sidebarOverlay");
      function openSidebar() {
        sidebar.classList.add("open");
        sidebarOverlay.classList.remove("hide");
      }
      function closeSidebar() {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.add("hide");
      }
      sidebarToggle.addEventListener("click", openSidebar);
      sidebarOverlay.addEventListener("click", closeSidebar);
      // Close sidebar on nav click (mobile only)
      document
        .querySelectorAll(".sidebar nav li, .sidebar nav button")
        .forEach((el) => {
          let a = el.querySelector("a");
          a.addEventListener("click", () => {
            if (window.innerWidth <= 900) {
              if (el.classList.contains("has-submenu")) {
                toggleSubmenu(el.id, el.id + "Chevron");
              } else {
                closeSidebar();
              }
            }
          });
        });
      // Fullscreen logic
      const fullscreenToggle = document.getElementById("fullscreenToggle");
      fullscreenToggle.addEventListener("click", function () {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      });
      document.addEventListener("fullscreenchange", function () {
        if (document.fullscreenElement) {
          document.body.classList.add("fullscreen-active");
          // Also close sidebar if open
          closeSidebar();
        } else {
          document.body.classList.remove("fullscreen-active");
        }
      });
    </script>
  </body>
</html>
