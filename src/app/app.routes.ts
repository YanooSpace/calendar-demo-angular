import { Routes } from '@angular/router';

export const routes: Routes = [
    // 'home' 경로에 접근했을 때, './pages/home/home.component' 모듈을 비동기적으로 로드하고,
    // HomeComponent를 불러오도록 설정합니다.
    {
        path:'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path:'calendar-01',
        loadComponent: () => import('./pages/calendar-01/calendar-01.component').then(m => m.Calendar01Component)
    },
    {
        path:'calendar-02',
        loadComponent: () => import('./pages/calendar-02/calendar-02.component').then(m => m.Calendar02Component)
    },
    {
        // 이외의 모든 경로에 대해서는 'home'으로 리다이렉트합니다.
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];
