// common.js

// --- API Utility ---
async function apiRequest(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}

// --- Table Rendering Utility ---
function renderTable(container, data, columns) {
  if (!container) return;
  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML = `<tr><td colspan="${columns.length}" style="text-align:center; color:#9ca3af;">No data found</td></tr>`;
    return;
  }
  container.innerHTML = data
    .map(
      (row, i) =>
        `<tr>` +
        columns
          .map(
            (col) =>
              `<td>${
                typeof col.render === "function"
                  ? col.render(row, i)
                  : row[col.key] || ""
              }</td>`
          )
          .join("") +
        `</tr>`
    )
    .join("");
}

// --- Form Handling Utility ---
function handleForm(form, onSubmit) {
  if (!form) return;
  form.onsubmit = async function (e) {
    e.preventDefault();
    await onSubmit(new FormData(form));
  };
}

// --- Image Preview Utility ---
function previewImage(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (input && preview) {
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.src = e.target.result;
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
        preview.style.display = "none";
      }
    });
  }
}

// --- Export to window for global access ---
window.apiRequest = apiRequest;
window.renderTable = renderTable;
window.handleForm = handleForm;
window.previewImage = previewImage;
