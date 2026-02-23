import { watch, computed, ref, withCtx, unref, createTextVNode, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, vModelSelect, vModelCheckbox, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-7_VVwp8m.js";
import { useForm, Head, Link, router } from "@inertiajs/vue3";
import * as Icons from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "clsx";
import "axios";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    youth: Object,
    guardians: Array
  },
  setup(__props) {
    const props = __props;
    const profileDefaults = (youth) => ({
      first_name: youth.first_name ?? "",
      last_name: youth.last_name ?? "",
      preferred_name: youth.preferred_name ?? "",
      date_of_birth: youth.date_of_birth ?? "",
      gender: youth.gender ?? "",
      primary_language: youth.primary_language ?? "",
      school_year: youth.school_year ?? "",
      school_name: youth.school_name ?? "",
      status: youth.status ?? "pending",
      active: Boolean(youth.active),
      photo_consent: Boolean(youth.photo_consent)
    });
    const healthDefaults = (youth) => ({
      allergies: youth.allergies ?? "",
      medical_notes: youth.medical_notes ?? "",
      medications: youth.medications ?? "",
      dietary_requirements: youth.dietary_requirements ?? ""
    });
    const consentDefaults = (youth) => {
      const consent = youth.consents?.[0] ?? null;
      return {
        guardian_id: consent?.guardian_id ?? youth.guardians?.[0]?.id ?? null,
        signature_name: consent?.signature_name ?? "",
        general_attendance: Boolean(consent?.general_attendance ?? false),
        offsite_events: Boolean(consent?.offsite_events ?? false),
        media_consent: Boolean(consent?.media_consent ?? false),
        medical_treatment: Boolean(consent?.medical_treatment ?? false),
        transport: Boolean(consent?.transport ?? false)
      };
    };
    const profileForm = useForm(profileDefaults(props.youth));
    profileForm.transform((data) => ({
      ...data,
      date_of_birth: data.date_of_birth || null
    }));
    const healthForm = useForm(healthDefaults(props.youth));
    const consentForm = useForm(consentDefaults(props.youth));
    consentForm.transform((data) => ({
      ...data,
      guardian_id: data.guardian_id || null
    }));
    const syncForms = (youth) => {
      profileForm.defaults(profileDefaults(youth));
      profileForm.reset();
      healthForm.defaults(healthDefaults(youth));
      healthForm.reset();
      consentForm.defaults(consentDefaults(youth));
      consentForm.reset();
    };
    watch(
      () => props.youth,
      (youth) => {
        syncForms(youth);
      },
      { deep: true }
    );
    const updateProfile = () => {
      profileForm.put(route("admin.youth.update", props.youth.id), {
        preserveScroll: true
      });
    };
    const updateHealth = () => {
      healthForm.put(route("admin.youth.update", props.youth.id), {
        preserveScroll: true
      });
    };
    const saveConsent = () => {
      consentForm.post(route("admin.youth.consents.store", props.youth.id), {
        preserveScroll: true
      });
    };
    const remove = () => {
      if (!confirm("Are you sure you want to delete this young person?")) {
        return;
      }
      router.delete(route("admin.youth.destroy", props.youth.id));
    };
    const latestConsent = computed(() => props.youth.consents?.[0] ?? null);
    const guardianDrawerOpen = ref(false);
    const editingGuardian = ref(null);
    const guardianDefaults = (guardian) => ({
      first_name: guardian?.first_name ?? "",
      last_name: guardian?.last_name ?? "",
      preferred_name: guardian?.preferred_name ?? "",
      primary_phone: guardian?.primary_phone ?? "",
      secondary_phone: guardian?.secondary_phone ?? "",
      email: guardian?.email ?? "",
      address_line1: guardian?.address_line1 ?? "",
      address_line2: guardian?.address_line2 ?? "",
      city: guardian?.city ?? "",
      postcode: guardian?.postcode ?? "",
      relationship: guardian?.pivot?.relationship ?? guardian?.relationship ?? "",
      preferred_contact_method: guardian?.preferred_contact_method ?? "phone",
      notes: guardian?.notes ?? "",
      is_emergency_contact: Boolean(guardian?.is_emergency_contact ?? true),
      is_primary: Boolean(guardian?.pivot?.is_primary ?? false),
      contact_order: guardian?.pivot?.contact_order ?? 1,
      can_pickup: Boolean(guardian?.pivot?.can_pickup ?? true),
      receives_notifications: Boolean(guardian?.pivot?.receives_notifications ?? true)
    });
    const guardianForm = useForm(guardianDefaults(null));
    guardianForm.transform((data) => ({
      ...data,
      preferred_name: data.preferred_name || null,
      secondary_phone: data.secondary_phone || null,
      email: data.email || null,
      address_line1: data.address_line1 || null,
      address_line2: data.address_line2 || null,
      city: data.city || null,
      postcode: data.postcode || null,
      relationship: data.relationship || null,
      notes: data.notes || null,
      contact_order: data.contact_order || null
    }));
    const openGuardianDrawer = (guardian) => {
      editingGuardian.value = guardian;
      guardianForm.defaults(guardianDefaults(guardian));
      guardianForm.reset();
      guardianDrawerOpen.value = true;
    };
    const closeGuardianDrawer = () => {
      guardianDrawerOpen.value = false;
      editingGuardian.value = null;
      guardianForm.reset();
      guardianForm.clearErrors();
    };
    const saveGuardian = () => {
      if (!editingGuardian.value) {
        return;
      }
      guardianForm.patch(
        route("admin.youth.guardians.update", {
          youngPerson: props.youth.id,
          guardian: editingGuardian.value.id
        }),
        {
          preserveScroll: true,
          onSuccess: () => {
            closeGuardianDrawer();
          }
        }
      );
    };
    const formatDate = (value) => value ? new Date(value).toLocaleDateString() : "—";
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: props.youth.first_name
            }, null, _parent2, _scopeId));
            _push2(`<div class="space-y-6" data-v-17d30d78${_scopeId}><div class="flex flex-wrap items-center justify-between gap-4" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><p class="text-xs uppercase tracking-wide text-slate-500" data-v-17d30d78${_scopeId}>Young person</p><h1 class="text-2xl font-semibold text-slate-900" data-v-17d30d78${_scopeId}>${ssrInterpolate(props.youth.first_name)} ${ssrInterpolate(props.youth.last_name)}</h1><p class="text-sm text-slate-500" data-v-17d30d78${_scopeId}>Preferred name: ${ssrInterpolate(props.youth.preferred_name || "—")}</p></div><div class="flex flex-wrap gap-3" data-v-17d30d78${_scopeId}><button class="rounded-2xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600" data-v-17d30d78${_scopeId}> Delete </button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.youth.index"),
              class: "rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ← Back to directory `);
                } else {
                  return [
                    createTextVNode(" ← Back to directory ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><section class="grid gap-6 lg:grid-cols-3" data-v-17d30d78${_scopeId}><div class="panel p-6 lg:col-span-2" data-v-17d30d78${_scopeId}><div class="flex items-center justify-between" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-17d30d78${_scopeId}>Profile &amp; basics</p><p class="text-xs text-slate-500" data-v-17d30d78${_scopeId}>Names, school, language, and status</p></div><span class="${ssrRenderClass([props.youth.status === "active" ? "bg-emerald-100 text-emerald-700" : props.youth.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700", "rounded-full px-3 py-1 text-xs font-semibold"])}" data-v-17d30d78${_scopeId}>${ssrInterpolate(props.youth.status)}</span></div><form class="mt-6 space-y-5" data-v-17d30d78${_scopeId}><div class="grid gap-4 md:grid-cols-2" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>First name</label><input${ssrRenderAttr("value", unref(profileForm).first_name)} class="form-input" data-v-17d30d78${_scopeId}>`);
            if (unref(profileForm).errors.first_name) {
              _push2(`<p class="form-error" data-v-17d30d78${_scopeId}>${ssrInterpolate(unref(profileForm).errors.first_name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Last name</label><input${ssrRenderAttr("value", unref(profileForm).last_name)} class="form-input" data-v-17d30d78${_scopeId}>`);
            if (unref(profileForm).errors.last_name) {
              _push2(`<p class="form-error" data-v-17d30d78${_scopeId}>${ssrInterpolate(unref(profileForm).errors.last_name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Preferred name</label><input${ssrRenderAttr("value", unref(profileForm).preferred_name)} class="form-input" data-v-17d30d78${_scopeId}></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Status</label><select class="form-input" data-v-17d30d78${_scopeId}><option value="pending" data-v-17d30d78${ssrIncludeBooleanAttr(Array.isArray(unref(profileForm).status) ? ssrLooseContain(unref(profileForm).status, "pending") : ssrLooseEqual(unref(profileForm).status, "pending")) ? " selected" : ""}${_scopeId}>Pending</option><option value="active" data-v-17d30d78${ssrIncludeBooleanAttr(Array.isArray(unref(profileForm).status) ? ssrLooseContain(unref(profileForm).status, "active") : ssrLooseEqual(unref(profileForm).status, "active")) ? " selected" : ""}${_scopeId}>Active</option><option value="inactive" data-v-17d30d78${ssrIncludeBooleanAttr(Array.isArray(unref(profileForm).status) ? ssrLooseContain(unref(profileForm).status, "inactive") : ssrLooseEqual(unref(profileForm).status, "inactive")) ? " selected" : ""}${_scopeId}>Inactive</option></select></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Date of birth</label><input${ssrRenderAttr("value", unref(profileForm).date_of_birth)} type="date" class="form-input" data-v-17d30d78${_scopeId}></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Gender</label><input${ssrRenderAttr("value", unref(profileForm).gender)} class="form-input" data-v-17d30d78${_scopeId}></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Primary language</label><input${ssrRenderAttr("value", unref(profileForm).primary_language)} class="form-input" data-v-17d30d78${_scopeId}></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>School year</label><input${ssrRenderAttr("value", unref(profileForm).school_year)} class="form-input" data-v-17d30d78${_scopeId}></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>School name</label><input${ssrRenderAttr("value", unref(profileForm).school_name)} class="form-input" data-v-17d30d78${_scopeId}></div></div><div class="grid gap-4 md:grid-cols-2" data-v-17d30d78${_scopeId}><label class="flex items-center gap-2 text-sm text-slate-600" data-v-17d30d78${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(profileForm).active) ? ssrLooseContain(unref(profileForm).active, null) : unref(profileForm).active) ? " checked" : ""} type="checkbox" class="rounded" data-v-17d30d78${_scopeId}> Currently active </label><label class="flex items-center gap-2 text-sm text-slate-600" data-v-17d30d78${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(profileForm).photo_consent) ? ssrLooseContain(unref(profileForm).photo_consent, null) : unref(profileForm).photo_consent) ? " checked" : ""} type="checkbox" class="rounded" data-v-17d30d78${_scopeId}> Photo consent </label></div><div class="flex justify-end" data-v-17d30d78${_scopeId}><button type="submit" class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"${ssrIncludeBooleanAttr(unref(profileForm).processing) ? " disabled" : ""} data-v-17d30d78${_scopeId}> Save profile </button></div></form></div><div class="panel p-6 space-y-4" data-v-17d30d78${_scopeId}><div class="flex items-center justify-between" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-17d30d78${_scopeId}>Guardians</p><p class="text-xs text-slate-500" data-v-17d30d78${_scopeId}>Edit parent contact details</p></div></div><div class="space-y-3" data-v-17d30d78${_scopeId}><!--[-->`);
            ssrRenderList(__props.youth.guardians, (guardian) => {
              _push2(`<div class="rounded-2xl border border-slate-100 bg-slate-50 p-4" data-v-17d30d78${_scopeId}><div class="flex items-center justify-between gap-3" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-17d30d78${_scopeId}>${ssrInterpolate(guardian.first_name)} ${ssrInterpolate(guardian.last_name)}</p><p class="text-xs text-slate-500" data-v-17d30d78${_scopeId}>${ssrInterpolate(guardian.relationship || guardian.pivot?.relationship || "Guardian")}</p></div><button class="text-xs font-semibold text-indigo-600" data-v-17d30d78${_scopeId}> Edit </button></div><div class="mt-2 text-sm text-slate-600" data-v-17d30d78${_scopeId}><p data-v-17d30d78${_scopeId}>${ssrInterpolate(guardian.primary_phone)}</p>`);
              if (guardian.email) {
                _push2(`<p class="text-xs text-slate-500" data-v-17d30d78${_scopeId}>${ssrInterpolate(guardian.email)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="mt-2 text-xs text-slate-500" data-v-17d30d78${_scopeId}>${ssrInterpolate(guardian.pivot?.is_primary ? "Primary" : "Additional")} · ${ssrInterpolate(guardian.pivot?.can_pickup ? "Can collect" : "Pickup restricted")}</p></div></div>`);
            });
            _push2(`<!--]-->`);
            if (!__props.youth.guardians.length) {
              _push2(`<p class="text-sm text-slate-500" data-v-17d30d78${_scopeId}>No guardians linked yet.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></section><section class="grid gap-6 lg:grid-cols-3" data-v-17d30d78${_scopeId}><div class="panel p-6 lg:col-span-2" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-17d30d78${_scopeId}>Health &amp; safety</p><p class="text-xs text-slate-500" data-v-17d30d78${_scopeId}>Medical notes, allergies, medications, and dietary info</p></div><form class="mt-6 space-y-4" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Allergies</label><textarea rows="2" class="form-input" data-v-17d30d78${_scopeId}>${ssrInterpolate(unref(healthForm).allergies)}</textarea></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Medications</label><textarea rows="2" class="form-input" data-v-17d30d78${_scopeId}>${ssrInterpolate(unref(healthForm).medications)}</textarea></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Medical notes</label><textarea rows="3" class="form-input" data-v-17d30d78${_scopeId}>${ssrInterpolate(unref(healthForm).medical_notes)}</textarea></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Dietary requirements</label><textarea rows="2" class="form-input" data-v-17d30d78${_scopeId}>${ssrInterpolate(unref(healthForm).dietary_requirements)}</textarea></div><div class="flex justify-end" data-v-17d30d78${_scopeId}><button type="submit" class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"${ssrIncludeBooleanAttr(unref(healthForm).processing) ? " disabled" : ""} data-v-17d30d78${_scopeId}> Save health info </button></div></form></div><div class="panel p-6 space-y-6" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><div class="flex items-center justify-between" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-17d30d78${_scopeId}>Permissions</p><p class="text-xs text-slate-500" data-v-17d30d78${_scopeId}>Record guardian consent</p></div>`);
            if (latestConsent.value) {
              _push2(`<span class="text-xs text-slate-500" data-v-17d30d78${_scopeId}>Updated ${ssrInterpolate(formatDate(latestConsent.value.signed_at))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><form class="mt-4 space-y-3" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Guardian</label><select class="form-input" data-v-17d30d78${_scopeId}><option${ssrRenderAttr("value", null)} data-v-17d30d78${ssrIncludeBooleanAttr(Array.isArray(unref(consentForm).guardian_id) ? ssrLooseContain(unref(consentForm).guardian_id, null) : ssrLooseEqual(unref(consentForm).guardian_id, null)) ? " selected" : ""}${_scopeId}>Select guardian</option><!--[-->`);
            ssrRenderList(__props.guardians, (guardian) => {
              _push2(`<option${ssrRenderAttr("value", guardian.id)} data-v-17d30d78${ssrIncludeBooleanAttr(Array.isArray(unref(consentForm).guardian_id) ? ssrLooseContain(unref(consentForm).guardian_id, guardian.id) : ssrLooseEqual(unref(consentForm).guardian_id, guardian.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(guardian.first_name)} ${ssrInterpolate(guardian.last_name)}</option>`);
            });
            _push2(`<!--]--></select></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Signature</label><input${ssrRenderAttr("value", unref(consentForm).signature_name)} class="form-input" placeholder="Guardian name" data-v-17d30d78${_scopeId}></div><div class="grid gap-2" data-v-17d30d78${_scopeId}><label class="flex items-center gap-2 text-sm text-slate-600" data-v-17d30d78${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(consentForm).general_attendance) ? ssrLooseContain(unref(consentForm).general_attendance, null) : unref(consentForm).general_attendance) ? " checked" : ""} type="checkbox" class="rounded" data-v-17d30d78${_scopeId}> Weekly attendance </label><label class="flex items-center gap-2 text-sm text-slate-600" data-v-17d30d78${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(consentForm).offsite_events) ? ssrLooseContain(unref(consentForm).offsite_events, null) : unref(consentForm).offsite_events) ? " checked" : ""} type="checkbox" class="rounded" data-v-17d30d78${_scopeId}> Offsite events </label><label class="flex items-center gap-2 text-sm text-slate-600" data-v-17d30d78${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(consentForm).media_consent) ? ssrLooseContain(unref(consentForm).media_consent, null) : unref(consentForm).media_consent) ? " checked" : ""} type="checkbox" class="rounded" data-v-17d30d78${_scopeId}> Media + photos </label><label class="flex items-center gap-2 text-sm text-slate-600" data-v-17d30d78${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(consentForm).medical_treatment) ? ssrLooseContain(unref(consentForm).medical_treatment, null) : unref(consentForm).medical_treatment) ? " checked" : ""} type="checkbox" class="rounded" data-v-17d30d78${_scopeId}> Medical treatment </label><label class="flex items-center gap-2 text-sm text-slate-600" data-v-17d30d78${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(consentForm).transport) ? ssrLooseContain(unref(consentForm).transport, null) : unref(consentForm).transport) ? " checked" : ""} type="checkbox" class="rounded" data-v-17d30d78${_scopeId}> Transport </label></div><div class="flex justify-end pt-2" data-v-17d30d78${_scopeId}><button type="submit" class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"${ssrIncludeBooleanAttr(unref(consentForm).processing) ? " disabled" : ""} data-v-17d30d78${_scopeId}> Save permissions </button></div></form></div><div data-v-17d30d78${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-17d30d78${_scopeId}>Consent history</p><div class="mt-4 space-y-3" data-v-17d30d78${_scopeId}><!--[-->`);
            ssrRenderList(__props.youth.consents, (consent) => {
              _push2(`<div class="rounded-2xl border border-slate-100 p-3 text-sm" data-v-17d30d78${_scopeId}><p class="font-semibold text-slate-900" data-v-17d30d78${_scopeId}>Signed ${ssrInterpolate(formatDate(consent.signed_at))}</p><div class="mt-2 flex flex-wrap gap-2 text-xs text-slate-600" data-v-17d30d78${_scopeId}><span class="${ssrRenderClass(consent.general_attendance ? "text-emerald-600" : "text-rose-500")}" data-v-17d30d78${_scopeId}>Weekly</span><span class="${ssrRenderClass(consent.offsite_events ? "text-emerald-600" : "text-rose-500")}" data-v-17d30d78${_scopeId}>Offsite</span><span class="${ssrRenderClass(consent.media_consent ? "text-emerald-600" : "text-rose-500")}" data-v-17d30d78${_scopeId}>Media</span><span class="${ssrRenderClass(consent.medical_treatment ? "text-emerald-600" : "text-rose-500")}" data-v-17d30d78${_scopeId}>Medical</span><span class="${ssrRenderClass(consent.transport ? "text-emerald-600" : "text-rose-500")}" data-v-17d30d78${_scopeId}>Transport</span></div></div>`);
            });
            _push2(`<!--]-->`);
            if (!__props.youth.consents.length) {
              _push2(`<p class="text-sm text-slate-500" data-v-17d30d78${_scopeId}>Awaiting guardian consent.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></section><section class="grid gap-6 lg:grid-cols-3" data-v-17d30d78${_scopeId}><div class="panel p-6 lg:col-span-2" data-v-17d30d78${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-17d30d78${_scopeId}>Recent attendance</p><ul class="mt-4 divide-y divide-slate-100" data-v-17d30d78${_scopeId}><!--[-->`);
            ssrRenderList(__props.youth.attendance_records, (record) => {
              _push2(`<li class="flex items-center justify-between py-3 text-sm" data-v-17d30d78${_scopeId}><span class="text-slate-600" data-v-17d30d78${_scopeId}>${ssrInterpolate(formatDate(record.session.session_date))}</span><span class="text-sm font-semibold text-slate-900" data-v-17d30d78${_scopeId}>${ssrInterpolate(record.status)}</span></li>`);
            });
            _push2(`<!--]-->`);
            if (!__props.youth.attendance_records?.length) {
              _push2(`<li class="py-4 text-sm text-slate-500" data-v-17d30d78${_scopeId}>No attendance yet.</li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</ul></div><div class="panel p-6 space-y-4" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-17d30d78${_scopeId}>Tokens</p><p class="text-xs text-slate-500" data-v-17d30d78${_scopeId}>Current balance</p><div class="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4" data-v-17d30d78${_scopeId}><p class="text-3xl font-semibold text-slate-900" data-v-17d30d78${_scopeId}>${ssrInterpolate(__props.youth.token_account?.balance ?? 0)}</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.tokens.index"),
              class: "mt-2 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Token console `);
                  _push3(ssrRenderComponent(Icons.ArrowUpRight, { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Token console "),
                    createVNode(Icons.ArrowUpRight, { class: "h-4 w-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div data-v-17d30d78${_scopeId}><p class="text-sm font-semibold text-slate-900" data-v-17d30d78${_scopeId}>Linked guardians</p><ul class="mt-3 space-y-1 text-sm text-slate-600" data-v-17d30d78${_scopeId}><!--[-->`);
            ssrRenderList(__props.youth.guardians, (guardian) => {
              _push2(`<li data-v-17d30d78${_scopeId}>${ssrInterpolate(guardian.first_name)} ${ssrInterpolate(guardian.last_name)} <span class="text-xs text-slate-400" data-v-17d30d78${_scopeId}>· ${ssrInterpolate(guardian.primary_phone)}</span></li>`);
            });
            _push2(`<!--]-->`);
            if (!__props.youth.guardians.length) {
              _push2(`<li class="text-sm text-slate-500" data-v-17d30d78${_scopeId}>No guardians listed.</li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</ul></div></div></section></div>`);
            if (guardianDrawerOpen.value) {
              _push2(`<div class="fixed inset-0 z-40 flex" data-v-17d30d78${_scopeId}><div class="w-full flex-1 bg-slate-900/40" data-v-17d30d78${_scopeId}></div><div class="h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl" data-v-17d30d78${_scopeId}><div class="flex items-center justify-between border-b border-border px-6 py-4" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><p class="text-lg font-semibold text-slate-900" data-v-17d30d78${_scopeId}>Edit guardian</p><p class="text-xs text-slate-500" data-v-17d30d78${_scopeId}>Update contact and permissions</p></div><button class="rounded-full border border-slate-200 p-2" data-v-17d30d78${_scopeId}>`);
              _push2(ssrRenderComponent(Icons.X, { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</button></div><form class="space-y-4 px-6 py-6" data-v-17d30d78${_scopeId}><div class="grid gap-4 md:grid-cols-2" data-v-17d30d78${_scopeId}><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>First name</label><input${ssrRenderAttr("value", unref(guardianForm).first_name)} class="form-input" data-v-17d30d78${_scopeId}>`);
              if (unref(guardianForm).errors.first_name) {
                _push2(`<p class="form-error" data-v-17d30d78${_scopeId}>${ssrInterpolate(unref(guardianForm).errors.first_name)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Last name</label><input${ssrRenderAttr("value", unref(guardianForm).last_name)} class="form-input" data-v-17d30d78${_scopeId}>`);
              if (unref(guardianForm).errors.last_name) {
                _push2(`<p class="form-error" data-v-17d30d78${_scopeId}>${ssrInterpolate(unref(guardianForm).errors.last_name)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Preferred name</label><input${ssrRenderAttr("value", unref(guardianForm).preferred_name)} class="form-input" data-v-17d30d78${_scopeId}></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Relationship</label><input${ssrRenderAttr("value", unref(guardianForm).relationship)} class="form-input" data-v-17d30d78${_scopeId}></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Primary phone</label><input${ssrRenderAttr("value", unref(guardianForm).primary_phone)} class="form-input" data-v-17d30d78${_scopeId}>`);
              if (unref(guardianForm).errors.primary_phone) {
                _push2(`<p class="form-error" data-v-17d30d78${_scopeId}>${ssrInterpolate(unref(guardianForm).errors.primary_phone)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Secondary phone</label><input${ssrRenderAttr("value", unref(guardianForm).secondary_phone)} class="form-input" data-v-17d30d78${_scopeId}></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Email</label><input${ssrRenderAttr("value", unref(guardianForm).email)} type="email" class="form-input" data-v-17d30d78${_scopeId}>`);
              if (unref(guardianForm).errors.email) {
                _push2(`<p class="form-error" data-v-17d30d78${_scopeId}>${ssrInterpolate(unref(guardianForm).errors.email)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Preferred contact method</label><select class="form-input" data-v-17d30d78${_scopeId}><option value="phone" data-v-17d30d78${ssrIncludeBooleanAttr(Array.isArray(unref(guardianForm).preferred_contact_method) ? ssrLooseContain(unref(guardianForm).preferred_contact_method, "phone") : ssrLooseEqual(unref(guardianForm).preferred_contact_method, "phone")) ? " selected" : ""}${_scopeId}>Phone</option><option value="email" data-v-17d30d78${ssrIncludeBooleanAttr(Array.isArray(unref(guardianForm).preferred_contact_method) ? ssrLooseContain(unref(guardianForm).preferred_contact_method, "email") : ssrLooseEqual(unref(guardianForm).preferred_contact_method, "email")) ? " selected" : ""}${_scopeId}>Email</option><option value="sms" data-v-17d30d78${ssrIncludeBooleanAttr(Array.isArray(unref(guardianForm).preferred_contact_method) ? ssrLooseContain(unref(guardianForm).preferred_contact_method, "sms") : ssrLooseEqual(unref(guardianForm).preferred_contact_method, "sms")) ? " selected" : ""}${_scopeId}>SMS</option></select></div><div class="md:col-span-2" data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Address line 1</label><input${ssrRenderAttr("value", unref(guardianForm).address_line1)} class="form-input" data-v-17d30d78${_scopeId}></div><div class="md:col-span-2" data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Address line 2</label><input${ssrRenderAttr("value", unref(guardianForm).address_line2)} class="form-input" data-v-17d30d78${_scopeId}></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>City</label><input${ssrRenderAttr("value", unref(guardianForm).city)} class="form-input" data-v-17d30d78${_scopeId}></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Postcode</label><input${ssrRenderAttr("value", unref(guardianForm).postcode)} class="form-input" data-v-17d30d78${_scopeId}></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Contact order</label><input${ssrRenderAttr("value", unref(guardianForm).contact_order)} type="number" min="1" class="form-input" data-v-17d30d78${_scopeId}></div></div><div class="grid gap-2 md:grid-cols-2" data-v-17d30d78${_scopeId}><label class="flex items-center gap-2 text-sm text-slate-600" data-v-17d30d78${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(guardianForm).is_primary) ? ssrLooseContain(unref(guardianForm).is_primary, null) : unref(guardianForm).is_primary) ? " checked" : ""} type="checkbox" class="rounded" data-v-17d30d78${_scopeId}> Primary contact </label><label class="flex items-center gap-2 text-sm text-slate-600" data-v-17d30d78${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(guardianForm).receives_notifications) ? ssrLooseContain(unref(guardianForm).receives_notifications, null) : unref(guardianForm).receives_notifications) ? " checked" : ""} type="checkbox" class="rounded" data-v-17d30d78${_scopeId}> Receives notifications </label><label class="flex items-center gap-2 text-sm text-slate-600" data-v-17d30d78${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(guardianForm).can_pickup) ? ssrLooseContain(unref(guardianForm).can_pickup, null) : unref(guardianForm).can_pickup) ? " checked" : ""} type="checkbox" class="rounded" data-v-17d30d78${_scopeId}> Can collect child </label><label class="flex items-center gap-2 text-sm text-slate-600" data-v-17d30d78${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(guardianForm).is_emergency_contact) ? ssrLooseContain(unref(guardianForm).is_emergency_contact, null) : unref(guardianForm).is_emergency_contact) ? " checked" : ""} type="checkbox" class="rounded" data-v-17d30d78${_scopeId}> Emergency contact </label></div><div data-v-17d30d78${_scopeId}><label class="form-label" data-v-17d30d78${_scopeId}>Notes</label><textarea rows="3" class="form-input" data-v-17d30d78${_scopeId}>${ssrInterpolate(unref(guardianForm).notes)}</textarea></div><div class="flex justify-end gap-3 pt-4" data-v-17d30d78${_scopeId}><button type="button" class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold" data-v-17d30d78${_scopeId}> Cancel </button><button type="submit" class="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"${ssrIncludeBooleanAttr(unref(guardianForm).processing) ? " disabled" : ""} data-v-17d30d78${_scopeId}> Save guardian </button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), {
                title: props.youth.first_name
              }, null, 8, ["title"]),
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "flex flex-wrap items-center justify-between gap-4" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, "Young person"),
                    createVNode("h1", { class: "text-2xl font-semibold text-slate-900" }, toDisplayString(props.youth.first_name) + " " + toDisplayString(props.youth.last_name), 1),
                    createVNode("p", { class: "text-sm text-slate-500" }, "Preferred name: " + toDisplayString(props.youth.preferred_name || "—"), 1)
                  ]),
                  createVNode("div", { class: "flex flex-wrap gap-3" }, [
                    createVNode("button", {
                      class: "rounded-2xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600",
                      onClick: remove
                    }, " Delete "),
                    createVNode(unref(Link), {
                      href: _ctx.route("admin.youth.index"),
                      class: "rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" ← Back to directory ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("section", { class: "grid gap-6 lg:grid-cols-3" }, [
                  createVNode("div", { class: "panel p-6 lg:col-span-2" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Profile & basics"),
                        createVNode("p", { class: "text-xs text-slate-500" }, "Names, school, language, and status")
                      ]),
                      createVNode("span", {
                        class: ["rounded-full px-3 py-1 text-xs font-semibold", props.youth.status === "active" ? "bg-emerald-100 text-emerald-700" : props.youth.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"]
                      }, toDisplayString(props.youth.status), 3)
                    ]),
                    createVNode("form", {
                      class: "mt-6 space-y-5",
                      onSubmit: withModifiers(updateProfile, ["prevent"])
                    }, [
                      createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "form-label" }, "First name"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(profileForm).first_name = $event,
                            class: "form-input"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).first_name]
                          ]),
                          unref(profileForm).errors.first_name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "form-error"
                          }, toDisplayString(unref(profileForm).errors.first_name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "form-label" }, "Last name"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(profileForm).last_name = $event,
                            class: "form-input"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).last_name]
                          ]),
                          unref(profileForm).errors.last_name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "form-error"
                          }, toDisplayString(unref(profileForm).errors.last_name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "form-label" }, "Preferred name"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(profileForm).preferred_name = $event,
                            class: "form-input"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).preferred_name]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "form-label" }, "Status"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(profileForm).status = $event,
                            class: "form-input"
                          }, [
                            createVNode("option", { value: "pending" }, "Pending"),
                            createVNode("option", { value: "active" }, "Active"),
                            createVNode("option", { value: "inactive" }, "Inactive")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(profileForm).status]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "form-label" }, "Date of birth"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(profileForm).date_of_birth = $event,
                            type: "date",
                            class: "form-input"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).date_of_birth]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "form-label" }, "Gender"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(profileForm).gender = $event,
                            class: "form-input"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).gender]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "form-label" }, "Primary language"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(profileForm).primary_language = $event,
                            class: "form-input"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).primary_language]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "form-label" }, "School year"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(profileForm).school_year = $event,
                            class: "form-input"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).school_year]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "form-label" }, "School name"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(profileForm).school_name = $event,
                            class: "form-input"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(profileForm).school_name]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                        createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(profileForm).active = $event,
                            type: "checkbox",
                            class: "rounded"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(profileForm).active]
                          ]),
                          createTextVNode(" Currently active ")
                        ]),
                        createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(profileForm).photo_consent = $event,
                            type: "checkbox",
                            class: "rounded"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(profileForm).photo_consent]
                          ]),
                          createTextVNode(" Photo consent ")
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end" }, [
                        createVNode("button", {
                          type: "submit",
                          class: "rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white",
                          disabled: unref(profileForm).processing
                        }, " Save profile ", 8, ["disabled"])
                      ])
                    ], 32)
                  ]),
                  createVNode("div", { class: "panel p-6 space-y-4" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Guardians"),
                        createVNode("p", { class: "text-xs text-slate-500" }, "Edit parent contact details")
                      ])
                    ]),
                    createVNode("div", { class: "space-y-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.youth.guardians, (guardian) => {
                        return openBlock(), createBlock("div", {
                          key: guardian.id,
                          class: "rounded-2xl border border-slate-100 bg-slate-50 p-4"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm font-semibold text-slate-900" }, toDisplayString(guardian.first_name) + " " + toDisplayString(guardian.last_name), 1),
                              createVNode("p", { class: "text-xs text-slate-500" }, toDisplayString(guardian.relationship || guardian.pivot?.relationship || "Guardian"), 1)
                            ]),
                            createVNode("button", {
                              class: "text-xs font-semibold text-indigo-600",
                              onClick: ($event) => openGuardianDrawer(guardian)
                            }, " Edit ", 8, ["onClick"])
                          ]),
                          createVNode("div", { class: "mt-2 text-sm text-slate-600" }, [
                            createVNode("p", null, toDisplayString(guardian.primary_phone), 1),
                            guardian.email ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-slate-500"
                            }, toDisplayString(guardian.email), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "mt-2 text-xs text-slate-500" }, toDisplayString(guardian.pivot?.is_primary ? "Primary" : "Additional") + " · " + toDisplayString(guardian.pivot?.can_pickup ? "Can collect" : "Pickup restricted"), 1)
                          ])
                        ]);
                      }), 128)),
                      !__props.youth.guardians.length ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-slate-500"
                      }, "No guardians linked yet.")) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode("section", { class: "grid gap-6 lg:grid-cols-3" }, [
                  createVNode("div", { class: "panel p-6 lg:col-span-2" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Health & safety"),
                      createVNode("p", { class: "text-xs text-slate-500" }, "Medical notes, allergies, medications, and dietary info")
                    ]),
                    createVNode("form", {
                      class: "mt-6 space-y-4",
                      onSubmit: withModifiers(updateHealth, ["prevent"])
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Allergies"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(healthForm).allergies = $event,
                          rows: "2",
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(healthForm).allergies]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Medications"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(healthForm).medications = $event,
                          rows: "2",
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(healthForm).medications]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Medical notes"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(healthForm).medical_notes = $event,
                          rows: "3",
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(healthForm).medical_notes]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Dietary requirements"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(healthForm).dietary_requirements = $event,
                          rows: "2",
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(healthForm).dietary_requirements]
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end" }, [
                        createVNode("button", {
                          type: "submit",
                          class: "rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white",
                          disabled: unref(healthForm).processing
                        }, " Save health info ", 8, ["disabled"])
                      ])
                    ], 32)
                  ]),
                  createVNode("div", { class: "panel p-6 space-y-6" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Permissions"),
                          createVNode("p", { class: "text-xs text-slate-500" }, "Record guardian consent")
                        ]),
                        latestConsent.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-xs text-slate-500"
                        }, "Updated " + toDisplayString(formatDate(latestConsent.value.signed_at)), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("form", {
                        class: "mt-4 space-y-3",
                        onSubmit: withModifiers(saveConsent, ["prevent"])
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "form-label" }, "Guardian"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(consentForm).guardian_id = $event,
                            class: "form-input"
                          }, [
                            createVNode("option", { value: null }, "Select guardian"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.guardians, (guardian) => {
                              return openBlock(), createBlock("option", {
                                key: guardian.id,
                                value: guardian.id
                              }, toDisplayString(guardian.first_name) + " " + toDisplayString(guardian.last_name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(consentForm).guardian_id]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "form-label" }, "Signature"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(consentForm).signature_name = $event,
                            class: "form-input",
                            placeholder: "Guardian name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(consentForm).signature_name]
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(consentForm).general_attendance = $event,
                              type: "checkbox",
                              class: "rounded"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(consentForm).general_attendance]
                            ]),
                            createTextVNode(" Weekly attendance ")
                          ]),
                          createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(consentForm).offsite_events = $event,
                              type: "checkbox",
                              class: "rounded"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(consentForm).offsite_events]
                            ]),
                            createTextVNode(" Offsite events ")
                          ]),
                          createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(consentForm).media_consent = $event,
                              type: "checkbox",
                              class: "rounded"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(consentForm).media_consent]
                            ]),
                            createTextVNode(" Media + photos ")
                          ]),
                          createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(consentForm).medical_treatment = $event,
                              type: "checkbox",
                              class: "rounded"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(consentForm).medical_treatment]
                            ]),
                            createTextVNode(" Medical treatment ")
                          ]),
                          createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(consentForm).transport = $event,
                              type: "checkbox",
                              class: "rounded"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(consentForm).transport]
                            ]),
                            createTextVNode(" Transport ")
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-end pt-2" }, [
                          createVNode("button", {
                            type: "submit",
                            class: "rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white",
                            disabled: unref(consentForm).processing
                          }, " Save permissions ", 8, ["disabled"])
                        ])
                      ], 32)
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Consent history"),
                      createVNode("div", { class: "mt-4 space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.youth.consents, (consent) => {
                          return openBlock(), createBlock("div", {
                            key: consent.id,
                            class: "rounded-2xl border border-slate-100 p-3 text-sm"
                          }, [
                            createVNode("p", { class: "font-semibold text-slate-900" }, "Signed " + toDisplayString(formatDate(consent.signed_at)), 1),
                            createVNode("div", { class: "mt-2 flex flex-wrap gap-2 text-xs text-slate-600" }, [
                              createVNode("span", {
                                class: consent.general_attendance ? "text-emerald-600" : "text-rose-500"
                              }, "Weekly", 2),
                              createVNode("span", {
                                class: consent.offsite_events ? "text-emerald-600" : "text-rose-500"
                              }, "Offsite", 2),
                              createVNode("span", {
                                class: consent.media_consent ? "text-emerald-600" : "text-rose-500"
                              }, "Media", 2),
                              createVNode("span", {
                                class: consent.medical_treatment ? "text-emerald-600" : "text-rose-500"
                              }, "Medical", 2),
                              createVNode("span", {
                                class: consent.transport ? "text-emerald-600" : "text-rose-500"
                              }, "Transport", 2)
                            ])
                          ]);
                        }), 128)),
                        !__props.youth.consents.length ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-slate-500"
                        }, "Awaiting guardian consent.")) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("section", { class: "grid gap-6 lg:grid-cols-3" }, [
                  createVNode("div", { class: "panel p-6 lg:col-span-2" }, [
                    createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Recent attendance"),
                    createVNode("ul", { class: "mt-4 divide-y divide-slate-100" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.youth.attendance_records, (record) => {
                        return openBlock(), createBlock("li", {
                          key: record.id,
                          class: "flex items-center justify-between py-3 text-sm"
                        }, [
                          createVNode("span", { class: "text-slate-600" }, toDisplayString(formatDate(record.session.session_date)), 1),
                          createVNode("span", { class: "text-sm font-semibold text-slate-900" }, toDisplayString(record.status), 1)
                        ]);
                      }), 128)),
                      !__props.youth.attendance_records?.length ? (openBlock(), createBlock("li", {
                        key: 0,
                        class: "py-4 text-sm text-slate-500"
                      }, "No attendance yet.")) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "panel p-6 space-y-4" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Tokens"),
                      createVNode("p", { class: "text-xs text-slate-500" }, "Current balance"),
                      createVNode("div", { class: "mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4" }, [
                        createVNode("p", { class: "text-3xl font-semibold text-slate-900" }, toDisplayString(__props.youth.token_account?.balance ?? 0), 1),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin.tokens.index"),
                          class: "mt-2 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Token console "),
                            createVNode(Icons.ArrowUpRight, { class: "h-4 w-4" })
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-semibold text-slate-900" }, "Linked guardians"),
                      createVNode("ul", { class: "mt-3 space-y-1 text-sm text-slate-600" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.youth.guardians, (guardian) => {
                          return openBlock(), createBlock("li", {
                            key: guardian.id
                          }, [
                            createTextVNode(toDisplayString(guardian.first_name) + " " + toDisplayString(guardian.last_name) + " ", 1),
                            createVNode("span", { class: "text-xs text-slate-400" }, "· " + toDisplayString(guardian.primary_phone), 1)
                          ]);
                        }), 128)),
                        !__props.youth.guardians.length ? (openBlock(), createBlock("li", {
                          key: 0,
                          class: "text-sm text-slate-500"
                        }, "No guardians listed.")) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])
              ]),
              guardianDrawerOpen.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 z-40 flex"
              }, [
                createVNode("div", {
                  class: "w-full flex-1 bg-slate-900/40",
                  onClick: closeGuardianDrawer
                }),
                createVNode("div", { class: "h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl" }, [
                  createVNode("div", { class: "flex items-center justify-between border-b border-border px-6 py-4" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-lg font-semibold text-slate-900" }, "Edit guardian"),
                      createVNode("p", { class: "text-xs text-slate-500" }, "Update contact and permissions")
                    ]),
                    createVNode("button", {
                      class: "rounded-full border border-slate-200 p-2",
                      onClick: closeGuardianDrawer
                    }, [
                      createVNode(Icons.X, { class: "h-4 w-4" })
                    ])
                  ]),
                  createVNode("form", {
                    class: "space-y-4 px-6 py-6",
                    onSubmit: withModifiers(saveGuardian, ["prevent"])
                  }, [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "First name"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).first_name = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(guardianForm).first_name]
                        ]),
                        unref(guardianForm).errors.first_name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "form-error"
                        }, toDisplayString(unref(guardianForm).errors.first_name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Last name"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).last_name = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(guardianForm).last_name]
                        ]),
                        unref(guardianForm).errors.last_name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "form-error"
                        }, toDisplayString(unref(guardianForm).errors.last_name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Preferred name"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).preferred_name = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(guardianForm).preferred_name]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Relationship"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).relationship = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(guardianForm).relationship]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Primary phone"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).primary_phone = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(guardianForm).primary_phone]
                        ]),
                        unref(guardianForm).errors.primary_phone ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "form-error"
                        }, toDisplayString(unref(guardianForm).errors.primary_phone), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Secondary phone"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).secondary_phone = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(guardianForm).secondary_phone]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Email"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).email = $event,
                          type: "email",
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(guardianForm).email]
                        ]),
                        unref(guardianForm).errors.email ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "form-error"
                        }, toDisplayString(unref(guardianForm).errors.email), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Preferred contact method"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).preferred_contact_method = $event,
                          class: "form-input"
                        }, [
                          createVNode("option", { value: "phone" }, "Phone"),
                          createVNode("option", { value: "email" }, "Email"),
                          createVNode("option", { value: "sms" }, "SMS")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(guardianForm).preferred_contact_method]
                        ])
                      ]),
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode("label", { class: "form-label" }, "Address line 1"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).address_line1 = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(guardianForm).address_line1]
                        ])
                      ]),
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode("label", { class: "form-label" }, "Address line 2"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).address_line2 = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(guardianForm).address_line2]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "City"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).city = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(guardianForm).city]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Postcode"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).postcode = $event,
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(guardianForm).postcode]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Contact order"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).contact_order = $event,
                          type: "number",
                          min: "1",
                          class: "form-input"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [
                            vModelText,
                            unref(guardianForm).contact_order,
                            void 0,
                            { number: true }
                          ]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "grid gap-2 md:grid-cols-2" }, [
                      createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).is_primary = $event,
                          type: "checkbox",
                          class: "rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(guardianForm).is_primary]
                        ]),
                        createTextVNode(" Primary contact ")
                      ]),
                      createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).receives_notifications = $event,
                          type: "checkbox",
                          class: "rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(guardianForm).receives_notifications]
                        ]),
                        createTextVNode(" Receives notifications ")
                      ]),
                      createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).can_pickup = $event,
                          type: "checkbox",
                          class: "rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(guardianForm).can_pickup]
                        ]),
                        createTextVNode(" Can collect child ")
                      ]),
                      createVNode("label", { class: "flex items-center gap-2 text-sm text-slate-600" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(guardianForm).is_emergency_contact = $event,
                          type: "checkbox",
                          class: "rounded"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(guardianForm).is_emergency_contact]
                        ]),
                        createTextVNode(" Emergency contact ")
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "form-label" }, "Notes"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(guardianForm).notes = $event,
                        rows: "3",
                        class: "form-input"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(guardianForm).notes]
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [
                      createVNode("button", {
                        type: "button",
                        class: "rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold",
                        onClick: closeGuardianDrawer
                      }, " Cancel "),
                      createVNode("button", {
                        type: "submit",
                        class: "rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white",
                        disabled: unref(guardianForm).processing
                      }, " Save guardian ", 8, ["disabled"])
                    ])
                  ], 32)
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Youth/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-17d30d78"]]);
export {
  Show as default
};
