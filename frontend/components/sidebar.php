<?php
// Sidebar menu structure as an array
$sidebarMenu = [
  [
    'label' => 'Dashboard',
    'icon' => 'fa-th-large',
    'href' => 'dashboard.php',
    'pages' => ['dashboard'],
  ],
  [
    'label' => 'Location Directory',
    'icon' => 'fa-database',
    'pages' => ['state', 'district'],
    'children' => [
      ['label' => 'State', 'href' => 'state.php'],
      ['label' => 'District', 'href' => 'district.php'],
    ],
  ],
  [
    'label' => 'Master Data',
    'icon' => 'fa-database',
    'pages' => ['stream', 'degree', 'course', 'course_duration', 'affilication', 'approvedThrough', 'examType', 'ranking', 'ownership', 'collegeFacility'],
    'children' => [
      ['label' => 'Stream', 'href' => 'stream.php'],
      ['label' => 'Degree Type', 'href' => 'degree.php'],
      ['label' => 'Course Name', 'href' => 'course.php'],
      ['label' => 'Course Duration', 'href' => 'course_duration.php'],
      ['label' => 'Affiliation Name', 'href' => 'affilication.php'],
      ['label' => 'Approved Through', 'href' => 'approvedThrough.php'],
      ['label' => 'Exam Type', 'href' => 'examType.php'],
      ['label' => 'Ranking', 'href' => 'ranking.php'],
      ['label' => 'Ownership', 'href' => 'ownership.php'],
      ['label' => 'College-Facilities', 'href' => 'collegeFacility.php'],
    ],
  ],
  [
    'label' => 'College Master',
    'icon' => 'fa-university',
    'pages' => ['addcollege', 'datadisplay', 'collegeview'],
    'children' => [
      ['label' => 'Add College', 'href' => 'addcollege.php'],
      ['label' => 'College List', 'href' => 'addcollege.php'],
      ['label' => 'Data Display', 'href' => 'datadisplay.php'],
      ['label' => 'College View', 'href' => 'collegeview.php'],
    ],
  ],
  [
    'label' => 'Exam Master',
    'icon' => 'fa-file-alt',
    'pages' => ['examlevel', 'addexam'],
    'children' => [
      ['label' => 'Exam Level', 'href' => 'examlevel.php'],
      ['label' => 'Add Exam', 'href' => 'addexam.php'],
      ['label' => 'Exam List', 'href' => 'addexam.php'],
    ],
  ],
  [
    'label' => 'Adv. Master',
    'icon' => '',
    'ad' => true,
    'pages' => ['newadv', 'advlist'],
    'children' => [
      ['label' => 'New Adv.', 'href' => 'newadv.html'],
      ['label' => 'Adv List', 'href' => 'advlist.html'],
    ],
  ],
  [
    'label' => 'Enquiry Data',
    'icon' => 'fa-users',
    'pages' => ['registrationdata', 'signupdata', 'enquirydata'],
    'children' => [
      ['label' => 'Registration Data', 'href' => 'registrationdata.html'],
      ['label' => 'Signup Data', 'href' => 'signupdata.html'],
      ['label' => 'Enquiry Data', 'href' => 'enquirydata.html'],
    ],
  ],
  [
    'label' => 'Extra Pages',
    'icon' => 'fa-cog',
    'pages' => ['pagecreate'],
    'children' => [
      ['label' => 'Page Create', 'href' => 'pagecreate.html'],
    ],
  ],
];

$currentPage = str_replace('/', '', str_replace('.php', '', str_replace('.html', '', $_SERVER['PHP_SELF'])));
?>
<!-- Sidebar Component -->
<div class="sidebar hide-scrollbar" >
  <div class="logo">
    <img src="https://img.icons8.com/color/48/000000/school-building.png" alt="Logo" />
    <h2><b>BAMS KARNATAKA</b></h2>
  </div>
  <?php
  $reqURI = explode('/', $_SERVER['PHP_SELF']);
  $reqURI = $reqURI[count($reqURI) - 1];
  $reqURI = str_replace('.php', '', $reqURI);
  $currentPage = str_replace('.html', '', $reqURI);
  ?>
  <nav>
    <ul class="menu-list">
      <?php foreach ($sidebarMenu as $i => $item): ?>
        <?php
        $submenuOpen = 'no';
        if (isset($item['children'])) {
          if (in_array($currentPage, $item['pages'])) {
            $submenuOpen = 'yes';
          }
        }
        ?>
        <li class="menu-item<?= isset($item['children']) ? ' has-submenu' : ''; ?>">
          <?php if (isset($item['children'])): ?>
            <button class="menu-btn" type="button">
              <?= !empty($item['ad']) ? '<span style="font-size: 1.1em; background: #fff; color: #232b35; border-radius: 3px; padding: 2px 6px; margin-right: 8px; font-weight: bold;">Ad</span>' : ''; ?>
              <?= !empty($item['icon']) ? '<i class="fa ' . $item['icon'] . '"></i>' : ''; ?>
              <span class="menu-label"><?= $item['label']; ?></span>
              <i class="fa fa-chevron-down submenu-chevron" style="margin-left: auto <?= $submenuOpen == 'yes' ? 'transform: rotate(180deg); transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform: rotate(0deg); transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'; ?>"></i>
            </button>
            <ul class="submenu <?= $submenuOpen == 'yes' ? 'open' : ''; ?>">       
              <?php foreach ($item['children'] as $child): ?>
                <?php $childPage = preg_replace('/\.(php|html)$/', '', $child['href']); ?>
                <li>
                  <a href="<?= $child['href']; ?>" class="<?= $currentPage == $childPage ? 'active' : ''; ?>" style="color: inherit; text-decoration: none; padding-left: 40px;">
                    <?= $child['label']; ?>
                  </a>
                </li>
              <?php endforeach; ?>
            </ul>
          <?php else: ?>
            <?php $mainPage = isset($item['href']) ? preg_replace('/\.(php|html)$/', '', $item['href']) : ''; ?>
            <a href="<?= $item['href']; ?>" class="<?= $currentPage == $mainPage ? 'active' : ''; ?><?= !empty($item['badge']) ? ' active' : ''; ?>">
              <?= !empty($item['icon']) ? '<i class="fa ' . $item['icon'] . '"></i>' : ''; ?>
              <span class="menu-label"><?= $item['label']; ?></span>
              <?= !empty($item['badge']) ? '<span class="badge">' . $item['badge'] . '</span>' : ''; ?>
            </a>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
    </ul>
  </nav>
  <a href="#" class="logout"><i class="fa fa-sign-out-alt"></i>Logout</a>
</div>