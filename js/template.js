var sidebarTemplate = 
    `<ul class="sidebar navbar-nav toggled">
        <li class="nav-item active">
        <a class="nav-link" href="index.html">
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
            <a class="dropdown-item" href="divisions/operations.html">Operations</a>
            <a class="dropdown-item" href="divisions/project-development.html">Project Devlpmt</a>
            <a class="dropdown-item" href="divisions/technology-innovation.html">Tech &amp; Inovation</a>
            <a class="dropdown-item" href="divisions/employee-development.html">Emp Devlpmt</a>
            <div class="dropdown-divider"></div>
            <h6 class="dropdown-header">Regions</h6>
            <a class="dropdown-item" href="regions/region1.html">Region 1</a>
            <a class="dropdown-item" href="regions/region2.html">Region 2</a>
            <a class="dropdown-item" href="regions/region3.html">Region 3</a>
            <a class="dropdown-item" href="regions/region4.html">Region 4</a>
        </div>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="http://uplan.maps.arcgis.com/apps/MapSeries/index.html?appid=e39cf52788a448ec929fe6905f240257" target="new">
            <i class="fas fa-fw fa-chart-bar"></i>
            <span>Congestion</span></a>
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
        <a class="nav-link" href="/404.html">
            <i class="fas fa-fw fa-chart-line"></i>
            <span>Fed Measures</span></a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/404.html">
            <i class="fas fa-fw fa-road"></i>
            <span>Freeeway Metrics</span></a>
        </li>
        </ul>`

var navbarTemplate = 
    `<nav class="navbar navbar-expand navbar-dark bg-dark static-top">
        <a class="navbar-brand mr-1" href="https://www.udot.utah.gov/main/f?p=100:6:0::::V,T:,1">
            <img src="/img/UDOT-Logo-PNG.png" class="d-inline-block align-top">
        </a>
        <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
            <i class="fas fa-bars"></i>
        </button>
        <ul>
            <li>
                <a class="nav-link" href="http://www.udot.utah.gov/strategic-direction/">Strategic Direction</a>
            </li>
        </ul>
    </nav>`

$('sidebar').html(sidebarTemplate);
$('navbar').html(navbarTemplate);

