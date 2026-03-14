export function renderCalendar() {
  const el = document.getElementById("calendar");
  if (!el) return;

  const calendar = new FullCalendar.Calendar(el, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },

    events: [
      {
        id: "1",
        title: "Team Standup",
        start: "2026-03-12T09:00:00",
      },
      {
        id: "2",
        title: "Team Standup",
        start: "2026-03-16T09:00:00",
      },
    ],

    eventContent: function (arg) {
      const event = arg.event;

      const container = document.createElement("div");
      container.className =
        "bg-blue-50 border-l-4 border-blue-500 rounded-md p-2 text-sm";

      container.innerHTML = `
        <div class="text-blue-500 font-medium leading-tight">
          ${event.title}
        </div>
 
        <div class="text-xs text-blue-500 ">
          ${event.start}
        </div>
 
        <div class="flex items-center justify-between gap-2 text-sm mt-4">
          <span class="cursor-pointer text-blue-500 edit-btn"><svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5127 17.623H0V0H14.5127V17.623Z" stroke=""></path>
            <g clip-path="url(#clip0_325_54167)">
              <path d="M13.3676 2.42651C12.7468 1.80575 11.7434 1.80575 11.1226 2.42651L10.2694 3.27686L13.0444 6.05185L13.8976 5.19866C14.5184 4.5779 14.5184 3.57448 13.8976 2.95373L13.3676 2.42651ZM4.8867 8.66244C4.7138 8.83534 4.58057 9.04793 4.50404 9.2832L3.66503 11.8002C3.58283 12.044 3.64802 12.3133 3.82943 12.4975C4.01084 12.6818 4.28012 12.7441 4.52672 12.6619L7.04377 11.8229C7.2762 11.7464 7.48879 11.6132 7.66453 11.4403L12.4067 6.69528L9.62885 3.91746L4.8867 8.66244ZM2.72113 3.62551C1.21884 3.62551 0 4.84435 0 6.34664V13.603C0 15.1053 1.21884 16.3241 2.72113 16.3241H9.97749C11.4798 16.3241 12.6986 15.1053 12.6986 13.603V10.8819C12.6986 10.3802 12.2933 9.97482 11.7916 9.97482C11.2899 9.97482 10.8845 10.3802 10.8845 10.8819V13.603C10.8845 14.1047 10.4792 14.51 9.97749 14.51H2.72113C2.21942 14.51 1.81409 14.1047 1.81409 13.603V6.34664C1.81409 5.84493 2.21942 5.43959 2.72113 5.43959H5.44227C5.94398 5.43959 6.34931 5.03426 6.34931 4.53255C6.34931 4.03084 5.94398 3.62551 5.44227 3.62551H2.72113Z" fill="#3B82F6"></path>
            </g>
            <defs>
              <clipPath id="clip0_325_54167">
                <path d="M0 1.8125H14.5127V16.3252H0V1.8125Z" fill="white"></path>
              </clipPath>
            </defs>
          </svg></span>
          <span class="cursor-pointer text-red-500 delete-btn"><svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6982 17.623H0V0H12.6982V17.623Z" stroke=""></path>
            <g clip-path="url(#clip0_325_54172)">
              <path d="M3.83617 2.31421L3.63208 2.71954H0.910951C0.409242 2.71954 0.00390625 3.12488 0.00390625 3.62659C0.00390625 4.1283 0.409242 4.53363 0.910951 4.53363H11.7955C12.2972 4.53363 12.7025 4.1283 12.7025 3.62659C12.7025 3.12488 12.2972 2.71954 11.7955 2.71954H9.07435L8.87027 2.31421C8.7172 2.00525 8.40257 1.8125 8.0596 1.8125H4.64684C4.30386 1.8125 3.98923 2.00525 3.83617 2.31421ZM11.7955 5.44068H0.910951L1.51187 15.0497C1.55722 15.7668 2.15247 16.3252 2.8696 16.3252H9.83683C10.554 16.3252 11.1492 15.7668 11.1946 15.0497L11.7955 5.44068Z" fill="#EF4444"></path>
            </g>
            <defs>
              <clipPath id="clip0_325_54172">
                <path d="M0.00195312 1.8125H12.7006V16.3252H0.00195312V1.8125Z" fill="white"></path>
              </clipPath>
            </defs>
          </svg></span>
        </div>
      `;

      // // EDIT
      // container.querySelector(".edit-btn").addEventListener("click", (e) => {
      //   e.stopPropagation();
      //   alert("Edit event: " + event.title);
      // });

      // // DELETE
      // container.querySelector(".delete-btn").addEventListener("click", (e) => {
      //   e.stopPropagation();
      //   if (confirm("Delete event?")) {
      //     event.remove();
      //   }
      // });
      // EDIT
      container.querySelector(".edit-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        alert("Edit event: " + event.title);
      });

      // DELETE → open your custom modal
      container.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        const eventId = btn.getAttribute("data-event-id");
        const eventTitle = btn.getAttribute("data-event-title");

        // Open modal
        const modal = document.getElementById("deletecalendereventModal");
        modal.classList.remove("hidden");

        // Set modal text dynamically
        modal.querySelector(".font-semibold").textContent = eventTitle;
        modal.querySelector(".text-sm").textContent =
          "Are you sure you want to delete this event?";

        // Confirm delete
        const confirmBtn = modal.querySelector("#deleteTimelineBtn");

        // Remove previous listeners
        confirmBtn.replaceWith(confirmBtn.cloneNode(true));
        const newConfirmBtn = modal.querySelector("#deleteTimelineBtn");

        newConfirmBtn.addEventListener("click", () => {
          const calEvent = calendar.getEventById(eventId);
          if (calEvent) calEvent.remove();
          modal.classList.add("hidden");
        });

        // Cancel button
        modal
          .querySelector("#cancelTimelineBtn")
          .addEventListener("click", () => {
            modal.classList.add("hidden");
          });
      });

      return { domNodes: [container] };
    },
  });

  calendar.render();
}
