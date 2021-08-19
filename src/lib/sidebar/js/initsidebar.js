function initSidebar() {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar-dashboard').toggleClass('active');
    setTimeout(function () {
      $("#content-dashboard").toggleClass("set_margin_left_sidebar");
    }, 100)
    $(this).toggleClass("active");
  });
  $("#sidebarCollapse").on('click', function() {
    $("#sidebarCollapse").toggleClass("set_margin_left_sidebarCollapse");
    $(this).toggleClass("active");
  });
  $('#dismiss').on('click', function () {
    $('#sidebar-dashboard').toggleClass('active');
    setTimeout(function () {
      $("#content-dashboard").toggleClass("set_margin_left_sidebar");
    }, 100)
    $(this).toggleClass("active");
  });
}
