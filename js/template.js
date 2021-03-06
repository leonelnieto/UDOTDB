const linkHeader = window.location.href.slice(
  0,
  window.location.href.indexOf("dashboard")
);

var sidebarTemplate = `<ul class="sidebar navbar-nav toggled">
        <li class="nav-item active">
        <a class="nav-link" href="${linkHeader}dashboard/index.html">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Main Dashboard</span>
        </a>
        </li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-fw fa-folder"></i>
            <span>UDOT</span>
        </a>
        <div class="dropdown-menu" aria-labelledby="pagesDropdown">
            <a class="dropdown-item" href="${linkHeader}dashboard/divisions/operations.html">Operations</a>
            <a class="dropdown-item" href="${linkHeader}dashboard/divisions/project-development.html">Project Devlpmt</a>
            <a class="dropdown-item" href="${linkHeader}dashboard/divisions/technology-innovation.html">Tech &amp; Innovation</a>
            <a class="dropdown-item" href="${linkHeader}dashboard/divisions/employee-development.html">Emp Devlpmt</a>
            <div class="dropdown-divider"></div>
            <h6 class="dropdown-header">Regions</h6>
            <a class="dropdown-item" href="${linkHeader}dashboard/regions/region1.html">Region 1</a>
            <a class="dropdown-item" href="${linkHeader}dashboard/regions/region2.html">Region 2</a>
            <a class="dropdown-item" href="${linkHeader}dashboard/regions/region3.html">Region 3</a>
            <a class="dropdown-item" href="${linkHeader}dashboard/regions/region4.html">Region 4</a>
        </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="congestion" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-fw fa-chart-bar"></i>
                <span>Congestion Dashboard</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="congestion">
                <a class="dropdown-item" target="new" href="http://arcg.is/4511W">Statewide</a>
                <a class="dropdown-item" target="new" href="http://arcg.is/zv4nX">Region 1</a>
                <a class="dropdown-item" target="new" href="http://arcg.is/11P58y">Region 2</a>
                <a class="dropdown-item" target="new" href="http://arcg.is/09m1Wb">Region 3</a>
                <a class="dropdown-item" target="new" href="http://arcg.is/1Tverm">Region 4</a>
            </div>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="http://udot.thirdparty.iteris-pems.com/" target="new">
            <i class="fas fa-fw fa-stopwatch"></i>
            <span>Travel Times</span></a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="https://dashboard.udot.utah.gov/stories/s/23zu-qatg" target="new">
            <i class="fas fa-fw fa-comments"></i>
            <span>Trans Comm</span></a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="${linkHeader}dashboard/404.html">
            <i class="fas fa-fw fa-chart-line"></i>
            <span>Fed Measures</span></a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="${linkHeader}dashboard/404.html">
            <i class="fas fa-fw fa-road"></i>
            <span>Freeeway Metrics</span></a>
        </li>
        </ul>`;

var navbarTemplate = `<nav class="navbar navbar-expand navbar-dark bg-dark static-top">
        <a class="navbar-brand mr-1" href="https://www.udot.utah.gov/main/f?p=100:6:0::::V,T:,1">
            <img src="${linkHeader}dashboard/img/UDOT-Logo-PNG.png" class="d-inline-block align-top">
        </a>
        <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
            <i class="fas fa-bars"></i>
        </button>
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="http://www.udot.utah.gov/strategic-direction/">Strategic Direction</a>
            </li>
        </ul>
    </nav>`;

var footerTemplate = `<div class="container my-auto">
        <div class="copyright text-center my-auto">
        <span>Copyright © UDOT Data and Analytics Nerds</span>
        </div>
    </div>`

$("sidebar").html(sidebarTemplate);
$("navbar").html(navbarTemplate);
$("footer").html(footerTemplate);