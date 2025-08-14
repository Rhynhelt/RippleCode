import { HttpInterceptorFn, HttpParams } from '@angular/common/http';

// Map any UI labels to the API's enum names
const STATUS_UI_TO_API: Record<string, string> = {
  // pretty labels you may be using in the UI
  'Pending': 'Todo',
  'In Progress': 'InProgress',
  'Completed': 'Done',
  'Blocked': 'Blocked',
  // already-API-shaped values should pass through unchanged
  'Todo': 'Todo',
  'InProgress': 'InProgress',
  'Done': 'Done'
};

const normalizeStatus = (val: unknown): unknown => {
  if (typeof val !== 'string') return val;
  const key = val.trim();
  // try exact, then case-insensitive, then collapse spaces
  return (
    STATUS_UI_TO_API[key] ??
    STATUS_UI_TO_API[Object.keys(STATUS_UI_TO_API).find(k => k.toLowerCase() === key.toLowerCase()) || ''] ??
    STATUS_UI_TO_API[key.replace(/\s+/g, ' ')] ??
    key // fallback: leave as-is
  );
};

const normalizePriority = (val: unknown): unknown => {
  if (typeof val !== 'string') return val;
  // API expects: Low | Medium | High | Critical (capitalize first letter)
  const t = val.trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
};

const normalizeBody = (body: any) => {
  if (!body || typeof body !== 'object') return body;
  const clone: any = { ...body };
  if ('status' in clone) clone.status = normalizeStatus(clone.status);
  if ('priority' in clone) clone.priority = normalizePriority(clone.priority);
  return clone;
};

const normalizeParams = (params: HttpParams) => {
  let p = params;
  const st = p.get('status');
  if (st) p = p.set('status', String(normalizeStatus(st)));
  const pr = p.get('priority');
  if (pr) p = p.set('priority', String(normalizePriority(pr)));
  return p;
};

export const enumNormalizerInterceptor: HttpInterceptorFn = (req, next) => {
  // Normalize filters in GET /api/tasks?status=...&priority=...
  if (req.method === 'GET' && /\/api\/tasks(\/)?$/.test(req.url)) {
    req = req.clone({ params: normalizeParams(req.params) });
  }

  // Normalize payloads for POST/PUT to /api/tasks and /api/tasks/{id}
  if ((req.method === 'POST' || req.method === 'PUT') && /\/api\/tasks(\/\d+)?$/.test(req.url)) {
    req = req.clone({ body: normalizeBody(req.body) });
  }

  return next(req);
};
