<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Duration Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/course_duration.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
  <div class="main page-transition">
    <?php
    $pageTitle = 'Course Duration Management';
    $breadcrumb = ['Home', 'Master Data', 'Course Duration'];
    include '../components/breadcum.php';
    ?>
    <div class="main-container">
      <!-- Course Duration Form -->
      <div class="state-container" id="formDiv" style="display: none;">
        <h2 class="page-title">Add Course Duration</h2>
        <form id="courseDurationForm" class="state-form" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>Course Duration:</label>
              <input type="text" name="courseDuration" required placeholder="Enter course duration (e.g., 1 Year, 6 Months)" />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Course Duration List -->
      <div class="state-container" id="listDiv" style="display: block;">
        <div class="page-header">
          <h2 class="page-title">Course Duration List</h2>
          <div class="top-btns">
            <button id="showFormBtn" class="main-btn">
              <span>➕</span> Add Record
            </button>
            <button id="showListBtn" class="main-btn success">
              <span>📋</span> Record List
            </button>
          </div>
        </div>
        <div class="table-container">
          <table class="state-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="courseDurationTable"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

      <!-- Edit Course Duration Modal -->
      <div id="editCourseDurationModal" class="modal">
        <div class="modal-content">
          <span id="closeEditCourseDurationModal" class="modal-close">&times;</span>
          <h2 class="modal-title">Edit Course Duration</h2>
          <form id="editCourseDurationForm" class="modal-form" enctype="multipart/form-data">
            <input type="hidden" name="id" id="editCourseDurationId" />
            <div class="form-group">
              <label>Course Duration:</label>
              <input type="text" name="courseDuration" id="editCourseDurationName" required />
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" id="cancelEditCourseDurationBtn" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>

  <script src="../js/script.js"></script>
  <script src="../js/dashboard.js"></script>
  <script src="../js/common.js"></script>
  <script src="../js/pagination.js"></script>
  <script src="../js/course_duration.js"></script>
</body>
</html> 