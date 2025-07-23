<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>State Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
      <?php include '../components/state-header.php'; ?>
    <!-- Country management content (form/list) -->
    <div class="main-container" style="max-width: 900px; margin: 0 auto;">
      <div class="top-btns" style="display: flex; gap: 12px; margin-bottom: 24px;">
        <button id="showFormBtn" class="main-btn" style="background: #2563eb; color: #fff; border: none; border-radius: 6px; padding: 10px 22px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 8px rgba(37,99,235,0.08); transition: background 0.2s;">
          <span>➕</span> Add Record
        </button>
        <button id="showListBtn" class="main-btn" style="background: #22d3a7; color: #fff; border: none; border-radius: 6px; padding: 10px 22px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 8px rgba(34,211,167,0.08); transition: background 0.2s;">
          <span>📋</span> Record List
        </button>
      </div>

      <!-- Country Form -->
      <div class="form-container" id="formDiv" style="display: none; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); padding: 32px 28px; margin-bottom: 32px;">
        <h2 style="margin-top: 0; color: #2563eb; font-size: 1.8rem; margin-bottom: 24px;">Add State</h2>
        <form id="stateForm" enctype="multipart/form-data" style="display: flex; flex-direction: column; gap: 20px;">
          <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 700; color: #374151; margin-bottom: 8px; display: block; font-size: 1rem; letter-spacing: 0.5px;">Country Name:</label>
              <select name="country" id="countryDropdown" class="custom-select" required>
                <option value="">--Select Country--</option>
              </select>
            </div>
            <div style="flex: 1; min-width: 200px;">
              <label style="font-weight: 700; color: #374151; margin-bottom: 8px; display: block; font-size: 1rem; letter-spacing: 0.5px;">State Name:</label>
              <input type="text" name="name" required placeholder="Enter state name" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 1rem; transition: border-color 0.2s; box-sizing: border-box;" />
            </div>
            <div style="flex: 1; min-width: 200px;">
              <label style="font-weight: 700; color: #374151; margin-bottom: 8px; display: block; font-size: 1rem; letter-spacing: 0.5px;">State Code:</label>
              <input type="text" name="code" required placeholder="e.g., BR, UP, GJ" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 1rem; transition: border-color 0.2s; box-sizing: border-box;" />
            </div>
          </div>
          <div>
            <label style="font-weight: 700; color: #374151; margin-bottom: 8px; display: block; font-size: 1rem; letter-spacing: 0.5px;">Description:</label>
            <textarea name="description" required rows="4" placeholder="Enter state description" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 1rem; transition: border-color 0.2s; box-sizing: border-box; resize: vertical; min-height: 100px;"></textarea>
          </div>
          <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 700; color: #374151; margin-bottom: 8px; display: block; font-size: 1rem; letter-spacing: 0.5px;">State Logo:</label>
              <input type="file" name="logo" accept="image/*" style="width: 100%; padding: 8px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 0.95rem; transition: border-color 0.2s; box-sizing: border-box;" />
            </div>
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 700; color: #374151; margin-bottom: 8px; display: block; font-size: 1rem; letter-spacing: 0.5px;">State Map:</label>
              <input type="file" name="flag" accept="image/*" style="width: 100%; padding: 8px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 0.95rem; transition: border-color 0.2s; box-sizing: border-box;" />
            </div>
          </div>
          <div style="display: flex; gap: 12px; margin-top: 10px;">
            <button type="submit" style="background: #2563eb; color: #fff; border: none; border-radius: 8px; padding: 14px 32px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s; min-width: 120px;">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" style="background: #6b7280; color: #fff; border: none; border-radius: 8px; padding: 14px 32px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s; min-width: 120px;">Cancel</button>
          </div>
        </form>
      </div>

      <!-- State List -->
      <div class="list-container" id="listDiv" style="display: block; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); padding: 32px 28px;">
        <h2 style="margin-top: 0; color: #2563eb; font-size: 1.8rem; margin-bottom: 24px;">State List</h2>
        <div style="overflow-x: auto;">
          <table class="state-table" style="width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.03); min-width: 800px;">
            <thead>
              <tr style="background: #f8fafc; color: #374151;">
                <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">#</th>
                <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">State Name</th>
                <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">State Code</th>
                <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Country</th>
                <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Description</th>
                <th style="padding: 16px 12px; text-align: center; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Logo</th>
                <th style="padding: 16px 12px; text-align: center; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Map</th>
              </tr>
            </thead>
            <tbody id="stateTable" style="font-size: 0.95rem;"></tbody>
          </table>
        </div>
    
      </div>
      <?php include '../components/footer.php'; ?>
    </div>
    <script src="../js/script.js"></script>
    <script src="../js/dashboard.js"></script>
    <script src="../js/state.js"></script>
  </body>
</html>