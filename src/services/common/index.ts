import instance from '@/services/instance';

/**
 * 檢查 API 健康狀態的 API
 *
 * { status: true } 代表 API 正常
 *
 * { status: false } 代表 API 異常
 *
 * @returns {Promise<{ status: boolean }>} API 健康狀態
 */
export function apiHealth() {
  return instance.get<{ status: boolean }>('/_/health');
}
