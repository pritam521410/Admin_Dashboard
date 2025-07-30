<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ranking Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/ranking.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
        <?php
        $pageTitle = 'Ranking Management';
        $breadcrumb = ['Home', 'Master Data', 'Ranking'];
        include '../components/breadcum.php';
        ?>
     
    <!-- Ranking management content (form/list) -->
    <div class="main-container">
      <!-- Ranking Form -->
      <div class="state-container" id="formDiv" style="display: none;">
        <h2 class="page-title">Add Ranking</h2>
        <form id="rankingForm" class="state-form" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>Body Name:</label>
              <input type="text" name="name" required placeholder="Enter body name" />
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Rank Value:</label>
              <input type="text" name="RankValue" required placeholder="Enter rank value" />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Ranking List -->
      <div class="state-container" id="listDiv" style="display: block;">
        <div class="page-header">
          <h2 class="page-title">Ranking List</h2>
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
                <th>Body Name</th>
                <th>Rank Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="rankingTable"></tbody>
          </table>
        </div>
      </div>

      <!-- Edit Ranking Modal -->
      <div id="editRankingModal" class="modal">
        <div class="modal-content">
          <span id="closeEditRankingModal" class="modal-close">&times;</span>
          <h2 class="modal-title">Edit Ranking</h2>
          <form id="editRankingForm" class="modal-form" enctype="multipart/form-data">
            <input type="hidden" name="id" id="editRankingId" />
            <div class="form-group">
              <label>Body Name:</label>
              <input type="text" name="name" id="editRankingName" required />
            </div>
            <div class="form-group">
              <label>Rank Value:</label>
              <input type="text" name="RankValue" id="editRankingValue" required />
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" id="cancelEditRankingBtn" class="btn btn-secondary">Cancel</button>
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
    <script src="../js/ranking.js"></script>
  </body>
</html> 