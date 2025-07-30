<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Course Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/course.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
        <?php
        $pageTitle = 'Course Management';
        $breadcrumb = ['Home', 'Master Data', 'Course'];
        include '../components/breadcum.php';
        ?>
     
    <!-- Course management content (form/list) -->
    <div class="main-container">
      <!-- Course Form -->
      <div class="state-container" id="formDiv" style="display: none;">
        <h2 class="page-title">Add Course</h2>
        <form id="courseForm" class="state-form" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>Stream Name:</label>
              <select name="stream" id="streamName" class="custom-select" required>
                <option value="">-- Select Stream --</option>
              </select>
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Degree Type:</label>
              <select name="degree" id="degreeType" class="custom-select" required>
                <option value="">-- Select Degree --</option>
              </select>
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Course Name:</label>
              <input type="text" name="name" required placeholder="Enter course name" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>Course Logo:</label>
              <input type="file" name="logo" accept="image/*" />
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Course Icon (Fa Icon):</label>
              <input type="text" name="courseIcon" placeholder="e.g. fa-book" />
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Average Fee:</label>
              <input type="text" name="averageFee" required placeholder="Enter average fee" />
            </div>
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea name="description" required rows="4" placeholder="Enter course description"></textarea>
          </div>
          <div class="form-group">
            <label>Admission Process:</label>
            <textarea name="admissionProcess" required rows="4" placeholder="Enter admission process"></textarea>
          </div>
          <div class="form-group">
            <label>Eligibility Criteria:</label>
            <textarea name="eligibilityCriteria" required rows="4" placeholder="Enter eligibility criteria"></textarea>
          </div>
          <div class="form-group">
            <label>Entrance Exams Details:</label>
            <textarea name="entranceExams" required rows="4" placeholder="Enter entrance exams details"></textarea>
          </div>
          <div class="form-group">
            <label>How to Prepare:</label>
            <textarea name="howToPrepare" required rows="4" placeholder="Enter preparation guide"></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Course List -->
      <div class="state-container" id="listDiv" style="display: block;">
        <div class="page-header">
          <h2 class="page-title">Course List</h2>
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
                <th>Course Name</th>
                <th>Degree Type</th>
                <th>Stream Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="courseTable"></tbody>
          </table>
        </div>
      </div>

      <!-- Edit Course Modal -->
      <div id="editCourseModal" class="modal">
        <div class="modal-content">
          <span id="closeEditCourseModal" class="modal-close">&times;</span>
          <h2 class="modal-title">Edit Course</h2>
          <form id="editCourseForm" class="modal-form" enctype="multipart/form-data">
            <input type="hidden" name="id" id="editCourseId" />
            <div class="form-group">
              <label>Course Name:</label>
              <input type="text" name="name" id="editCourseName" required />
            </div>
            <div class="form-group">
              <label>Stream:</label>
              <select name="stream" id="editCourseStream" class="custom-select" required></select>
            </div>
            <div class="form-group">
              <label>Degree:</label>
              <select name="degree" id="editCourseDegree" class="custom-select" required></select>
            </div>
            <div class="form-group">
              <label>Average Fee:</label>
              <input type="text" name="averageFee" id="editCourseFee" required />
            </div>
            <div class="form-group">
              <label>Description:</label>
              <textarea name="description" id="editCourseDescription" required rows="3"></textarea>
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" id="cancelEditCourseBtn" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <?php include '../components/footer.php'; ?>
    </div>
    <script src="../js/script.js"></script>
    <script src="../js/dashboard.js"></script>
    <script src="../js/common.js"></script>
    <script src="../js/pagination.js"></script>
    <script src="../js/course.js"></script>
  </body>
</html> 