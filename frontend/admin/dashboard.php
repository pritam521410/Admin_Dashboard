<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Dashboard</title>
    <link href="../style.css" rel="stylesheet" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />
  </head>
  <body>
    <?php include '../components/header.php'; ?>
    <?php include '../components/sidebar.php'; ?>
    <div class="main page-transition">
      <?php include '../components/page-header.php'; ?>
      <div class="dashboard-cards">
        <a href="country.php" style="text-decoration: none">
          <div class="card card-blue">
            <div class="card-title" style="color: inherit">Country</div>
            <div class="card-value" id='countryCountForDashboard'></div>
            <span href="country.php" class="more-info"
              >More info <i class="fa fa-arrow-circle-right"></i
            ></span>
          </div>
        </a>
        <div class="card card-orange">
          <div class="card-title">State</div>
          <div class="card-value" id="StateCountForDashboard"></div>
          <a href="state.php" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-purple">
          <div class="card-title">District</div>
          <div class="card-value" id="districtCountForDashboard"></div>
          <a href="district.php" class="more-info"
            >More info <i class="fa fa-arrow-circle-right"></i
          ></a>
        </div>
        <div class="card card-red">
          <div class="card-title">Stream</div>
          <div class="card-value" id="streamCountForDashboard"></div>
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
      <?php include '../components/footer.php'; ?>
    </div>
    <script src="../js/script.js"></script>
    <script src="../js/dashboard.js"></script>
    
  </body>
</html>