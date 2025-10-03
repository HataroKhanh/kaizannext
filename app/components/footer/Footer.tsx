export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="mt-12 border-t border-neutral-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          {/* Row: 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-md bg-[#4299E1] text-white grid place-items-center font-bold">
                  汉
                </div>
                <span className="text-lg font-semibold">Hi HSK</span>
              </div>
              <p className="mt-3 text-sm text-neutral-600 max-w-sm">
                Nền tảng học tiếng Trung trực tuyến hàng đầu
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-800">
                Khóa học
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                <li>
                  <a className="hover:text-[#4299E1]" href="#">
                    Giáo trình HSK
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#4299E1]" href="#">
                    Từ vựng chủ đề
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#4299E1]" href="#">
                    Hội thoại
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#4299E1]" href="#">
                    Luyện thi
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-800">
                Công cụ
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                <li>
                  <a className="hover:text-[#4299E1]" href="#">
                    Bộ thủ Hán tự
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#4299E1]" href="#">
                    Công cụ dịch
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#4299E1]" href="#">
                    Luyện phát âm
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#4299E1]" href="#">
                    Đọc hiểu
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-800">
                Liên hệ
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                <li>
                  <a
                    className="hover:text-[#4299E1]"
                    href="mailto:hihsk.com@gmail.com"
                  >
                    hihsk.com@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Row: Store buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-xl border border-neutral-300 px-4 py-3 hover:bg-neutral-50"
              >
                <div className="h-6 w-6 rounded bg-neutral-200" aria-hidden />
                <span className="text-sm font-medium">Google Play</span>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-xl border border-neutral-300 px-4 py-3 hover:bg-neutral-50"
              >
                <div className="h-6 w-6 rounded bg-neutral-200" aria-hidden />
                <span className="text-sm font-medium">App Store</span>
              </a>
            </div>
            <div className="w-full sm:w-auto h-px sm:h-10 sm:w-px bg-neutral-200 sm:mx-6" />
            <div className="text-sm text-neutral-600 text-center sm:text-right">
              © 2025 HiHSK. Tất cả quyền được bảo lưu.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
